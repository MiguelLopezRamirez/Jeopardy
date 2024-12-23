import React, { createContext, useState } from 'react';
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
      }else {
          await popupIncorrect_1();
          setAnswered(true);
          setTempTeamIndex(currentTeamIndex);
      }
      handleAnswerSubmit_1();
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
    }
  };

  const handleAnswerSubmit_1 = () => {
    console.log(`Respuesta para ${teams[currentTeamIndex].name}:`);
    setCurrentTeamIndex((prevIndex) =>
      prevIndex < teams.length - 1 ? prevIndex + 1 : 0
    );
  };
  const handleAnswerSubmit_2 = () => {
    console.log(`Respuesta para ${teams[tempTeamIndex].name}:`);
    setTempTeamIndex((prevIndex) =>
      prevIndex < teams.length - 1 ? prevIndex + 1 : 0
    );
  };
  //Popups
  const popupCorrect = async () => {
    const result = await Swal.fire({
      title: '¡Correcto!',
      text: 'Has respondido correctamente.',
      icon: 'success',
      confirmButtonText: '¡Genial!',
    });
  };
  const popupIncorrect_1 = async () => {
    const result = await Swal.fire({
      title: '¡Incorrecto!',
      text: 'La respuesta es incorrecta. Puede intentar el siguiente equipo.',
      icon: 'error',
      confirmButtonText: 'Entendido',
    });
  };
  const popupIncorrect_2 = async () => {
    const result = await Swal.fire({
      title: '¡Incorrecto!',
      text: 'La respuesta es incorrecta. Sigue con la siguiente pregunta.',
      icon: 'error',
      confirmButtonText: 'Entendido',
    });
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
