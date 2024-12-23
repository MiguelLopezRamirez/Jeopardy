import React, { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Importa SweetAlert2
export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [teams, setTeams] = useState(null);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [tempTeamIndex, setTempTeamIndex] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answered, setAnswered] = useState(false);
  const options = ["A", "B", "C", "D"]; //Opciones de juego
  const [finish, setFinish] = useState(false);
  const [showPopup_1, setShowPopup_1] = useState(false); // Nuevo estado para controlar el popup
  const [showPopup_2, setShowPopup_2] = useState(false); // Nuevo estado para controlar el popup

  const handleTeamsConfigured = (teamNames) => {
    // Convertimos la lista de nombres en un arreglo de objetos con nombre y puntaje inicial
    const tempTeams = teamNames.map(names => ({ name: names, score: 0 }));
  
    setTeams(tempTeams); // Actualizamos el estado con el nuevo arreglo de objetos
  };
  

  const handleQuestionSelected = (question) => {
    setSelectedQuestion(question)
    setTempTeamIndex(currentTeamIndex)
  };

  const updateScore = () => {
    const updatedTeams = [...teams]; // Creamos una copia del arreglo original
    updatedTeams[currentTeamIndex].score = teams[currentTeamIndex].score + selectedQuestion.value ; // Cambiamos el puntaje del equipo en el índice 1
    setTeams(updatedTeams);
  };

  const blockQuestion = () =>{
    const updatedCategories =[...categories];
    for (const category of updatedCategories) {
      const question = category.questions.find(q => q.text === selectedQuestion.text); // Busca la pregunta por texto
      if (question) {
        question.answered = true; // Modifica el valor de la pregunta
        return;
      }
    }
    setCategories(updatedCategories);
  };

  const checkQuestions = () =>{
    for (const category of categories) {
      const question = category.questions.find(q => q.answered === false); // Busca la pregunta por texto
      if (question) {
        return;
      }
    }
    setFinish(true);
  };

  const handlefinishGame = () =>{
    setFinish(true);
  };

  const handleAnswerSelected =  async  (answer) => {
    if (answered == false ){
      if(answer === selectedQuestion.correct){
        await popupCorrect();
        //Agrega puntos
        updateScore();
        setSelectedQuestion(null);
        
        blockQuestion();
        checkQuestions();
        await handleAnswerSubmit_1();
        setShowPopup_2(true);
      }else {
          ejecutarTareas();
      }
      
    }else{
      if(answer === selectedQuestion.correct){
        await popupCorrect();
        //Agrega puntos
        updateScore();
        
      }else {
        await popupIncorrect_2();

      }
      //Compara si estan todas contestadas
      blockQuestion();
      checkQuestions();
      setSelectedQuestion(null);
      setAnswered(false);
      popupNextTeam();
    }
  };

  const ejecutarTareas = async () => {
    await handleAnswerSubmit_1(); // Actualiza el índice del equipo
    setAnswered(true); // Actualiza el estado de la respuesta
    setShowPopup_1(true); // Activa la bandera para mostrar el popup
  };

  // Monitorea el cambio en el índice del equipo y muestra el popup
  useEffect(() => {
    if (showPopup_1) {
      popupIncorrect_1(); // Llama al popup con el índice actualizado
      setShowPopup_1(false); // Reinicia la bandera para evitar múltiples llamadas
    }
  }, [showPopup_1]); // Solo se ejecuta cuando `showPopup` cambia

  // Monitorea el cambio en el índice del equipo y muestra el popup
  useEffect(() => {
    if (showPopup_2) {
      popupNextTeam();
      setShowPopup_2(false); // Reinicia la bandera para evitar múltiples llamadas
    }
  }, [showPopup_2]); // Solo se ejecuta cuando `showPopup` cambia

  const handleAnswerSubmit_1 = async () => {
    console.log(`Respuesta para ${teams[currentTeamIndex].name}:`);
    await new Promise((resolve) => {
      setCurrentTeamIndex((prevIndex) => {
        const nextIndex = prevIndex < teams.length - 1 ? prevIndex + 1 : 0;
        resolve(); // Resolver después de actualizar el índice
        return nextIndex;
      });
    });
  };

  const handleAnswerSubmit_2 = () => {
    console.log(`Respuesta para ${teams[tempTeamIndex].name}:`);
    setTempTeamIndex((prevIndex) =>
      prevIndex < teams.length - 1 ? prevIndex + 1 : 0
    );
  };
  //Popups
  const popupCorrect = async () => {
    playCongratulationsSound();
    const result = await Swal.fire({
      title: '¡Correcto!',
      text: `Has respondido correctamente ganas ${selectedQuestion.value} puntos.`,
      icon: 'success',
      confirmButtonText: '¡Genial!',
    });
  };
  const popupIncorrect_1 = async () => {
    playFailSound();
    const result = await Swal.fire({
      title: '¡Incorrecto!',
      text: `La respuesta es incorrecta. Puede intentar el equipo: ${teams[currentTeamIndex].name} .`,
      icon: 'error',
      confirmButtonText: 'Entendido',
    });
  };
  const popupIncorrect_2 = async () => {
    playFailSound();
    const result = await Swal.fire({
      title: '¡Incorrecto!',
      text: 'La respuesta es incorrecta. Sigue con la siguiente pregunta.',
      icon: 'error',
      confirmButtonText: 'Entendido',
    });
  };
  const popupNextTeam = () => {
    Swal.fire({
      title: '¡Siguiente Equipo!',
      text: `Sigue el Equipo: ${teams[currentTeamIndex].name}`,
      icon: 'success',
      confirmButtonText: 'Entendido',
    });
  }
  //Sonidos
  const playCongratulationsSound = () => {
    const audio = new Audio('/crowd-cheer-ii-6263.mp3'); // Ruta del archivo de sonido
    audio.play();
  };
  const playFailSound = () => {
    const audio = new Audio('/cartoon-fail-trumpet-278822.mp3'); // Ruta del archivo de sonido
    audio.play();
  };
  const [categories, setCategories] = useState([
    {
      name: 'Familia Politica',
      questions: [
        { text: '¿Qué carrera estudio Roberto en el TEC?', options: ['Ing. Civil', 'Ing. Sitemas', 'Arquitectura', 'Ing. Empresarial'], correct: 0, value: 100, answered: false },
        { text: '¿Cuantos años tiene Anselmo?', options: ['10', '20', '30', '40'], correct: 1, value: 200, answered: false },
        { text: '¿Cúal es el nombre del negocio del sonido del Tío Sergio?', options: ['El sonidito', 'El sonidote', 'El Flash', 'El sonido'], correct: 2, value: 300, answered: false },
        { text: '¿A qué se dedica el Tío Ismael?', options: ['Mecanico', 'Pintor', 'Cocinero', 'Agricultor'], correct: 3, value: 400, answered: false },
        { text: '¿Cúal es la residencia actual de la Tía Minerva?', options: ['Chihuahua', 'Jalisco', 'España', 'Durango'], correct: 3, value: 500, answered: false },
      ],
    },
    {
      name: 'Vida de Papichis',
      questions: [
        { text: 'Question 2.1', options: ['A', 'B', 'C', 'D'], correct: 0, value: 100, answered: false },
        { text: 'Question 2.2', options: ['A', 'B', 'C', 'D'], correct: 1, value: 200, answered: false },
        { text: 'Question 2.3', options: ['A', 'B', 'C', 'D'], correct: 2, value: 300, answered: false },
        { text: 'Question 2.4', options: ['A', 'B', 'C', 'D'], correct: 3, value: 400, answered: false },
        { text: 'Question 2.5', options: ['A', 'B', 'C', 'D'], correct: 1, value: 500, answered: false },
      ],
    },
    {
      name: 'Mascotas Ramirez',
      questions: [
        { text: 'Question 3.1', options: ['A', 'B', 'C', 'D'], correct: 0, value: 100, answered: false },
        { text: 'Question 3.2', options: ['A', 'B', 'C', 'D'], correct: 1, value: 200, answered: false },
        { text: 'Question 3.3', options: ['A', 'B', 'C', 'D'], correct: 2, value: 300, answered: false },
        { text: 'Question 3.4', options: ['A', 'B', 'C', 'D'], correct: 3, value: 400, answered: false },
        { text: 'Question 3.5', options: ['A', 'B', 'C', 'D'], correct: 3, value: 500, answered: false },
      ],
    },
    {
      name: 'Comida Familiar',
      questions: [
        { text: 'Question 4.1', options: ['A', 'B', 'C', 'D'], correct: 0, value: 100, answered: false },
        { text: 'Question 4.2', options: ['A', 'B', 'C', 'D'], correct: 1, value: 200, answered: false },
        { text: 'Question 4.3', options: ['A', 'B', 'C', 'D'], correct: 2, value: 300, answered: false },
        { text: 'Question 4.4', options: ['A', 'B', 'C', 'D'], correct: 3, value: 400, answered: false },
        { text: 'Question 4.5', options: ['A', 'B', 'C', 'D'], correct: 0, value: 500, answered: false },
      ],
    },
    {
      name: 'Misterios de Nayar',
      questions: [
        { text: 'Question 5.1', options: ['A', 'B', 'C', 'D'], correct: 0, value: 100, answered: false },
        { text: 'Question 5.2', options: ['A', 'B', 'C', 'D'], correct: 1, value: 200, answered: false },
        { text: 'Question 5.3', options: ['A', 'B', 'C', 'D'], correct: 2, value: 300, answered: false },
        { text: 'Question 5.4', options: ['A', 'B', 'C', 'D'], correct: 3, value: 400, answered: false },
        { text: 'Question 5.5', options: ['A', 'B', 'C', 'D'], correct: 2, value: 500, answered: false },
      ],
    },
  ]);
  

  return (
    <GameContext.Provider
      value={{
        teams,
        currentTeamIndex,
        categories,
        selectedQuestion,
        options,
        finish,
        playCongratulationsSound,
        handleTeamsConfigured,
        handleQuestionSelected,
        handleAnswerSelected,
        handleAnswerSubmit_1,
        handleAnswerSubmit_2,
        handlefinishGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
