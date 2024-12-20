const QuestionTable = ({ categories, onQuestionSelected }) => {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Question Board</h2>
        <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {categories.map((category, index) => (
                <th key={index} style={{ border: '1px solid black', padding: '10px' }}>
                  {category.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {categories.map((category, colIndex) => (
                  <td
                    key={colIndex}
                    style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }}
                    onClick={() => onQuestionSelected(category.questions[rowIndex])}
                  >
                    ${100 * (rowIndex + 1)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default QuestionTable;