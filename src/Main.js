import React from 'react';
import NumPad from './NumPad.js';
import Questions from './data/Questions.js';
import Alert from 'react-bootstrap/Button';

const initialState = { 
  result : "", 
  questions : Questions, 
  remainingQuestions : Questions.length,
  score : 0,
  status : "progress",
  success : false, 
  error : false,
  finish : false
};

const reducer = (state, action) => {

    let result = null;
    let success = false;
    let error = false;

    switch(action.type){
        case 'SETRESULT' :
          result = state.result;
          result += action.value;
          return {...state, result : result};
        case 'RESET' :
          result = "";
          return {...state, result : result};
        case 'VALID' :
            result = state.result;
            let currentQuestion = state.questions.find(question => {
              if(question.current === true){
                return question
              }
            })
            //Si le resultat est correct...
            if (currentQuestion && currentQuestion.result === result){
              let idQuestion = currentQuestion.id
              // On valide la question actuelle...
              state.questions[idQuestion].current = false;
              state.questions[idQuestion].valid = true;
              // on défini la prochaine en statut "current" (si ce n'est pas la derniere)
              if( (idQuestion + 1) !== state.questions.length)
                state.questions[idQuestion + 1].current = true;
              // on actualise le nombre de questions a deviner
              state.remainingQuestions -= 1;
              // on actualise le score
              state.score ++;
              // on vérifie si la partie est terminée ou non
              if(state.score === state.questions.length)
                state.finish = true
              success = true;
            } else {
              error = true;
            }
            return {...state, state : state, result : "", success : success, error : error};
        return state;
    }
}

function Main() {

  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div>
      {
        state.finish === false &&
        
        <div>
          <div>
            <Alert variant='primary'>
                Donnez le résultat de 
                {
                  state.questions.map((question, key) => {
                      if ( question.current ){
                        return <span key={key}> {question.mult}</span>
                      }
                  })
                }
            </Alert>
            { state.success === true && <Alert variant="success">Fécicitation! Veuillez résoudre le calcul suivant</Alert>}
            { state.error === true && <Alert variant="danger">Echec. Saisissez un autre résultat</Alert>}
          </div>
          <br/>
          <div>
            <Alert variant='primary'>
              Calcul: { state.result }
            </Alert>
          </div>
          <br/>
          <div>
            <Alert variant='primary'>
              <p> Nombre restant de multiplication à deviner : { state.remainingQuestions}</p>
              <p> Score : { state.score}</p>
              <p> Status : { state.status}</p>
            </Alert>
          </div>
          <br/>
          <NumPad 
            onSelect={(v) => dispatch({type : "SETRESULT", value: v})}
            onReset={() => dispatch({type : "RESET"})}    
            onValid={() => dispatch({type : "VALID"})}    
          />
        </div>
      }

    {
      state.finish === true &&

      <Alert variant="success">Fécicitation! Vous avez terminé la partie.</Alert>
    }
      
    </div>
  );
}

export default Main;
