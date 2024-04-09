//Hooks
import { useState } from 'react'
//estilos
import './css/App.css'
//Constantes
import { WINS, TURNS } from './const/const.js'
//Componentes
import { Square } from './components/Square.jsx'
import { Winner } from './components/Winner.jsx'




function App() {
  //Estado del tablero
  const [board, setBoard] = useState(Array(9).fill(null))

  //Estado de los turnos
  const [turn, setTurn] = useState(TURNS.X)

  //Estado para definir el ganador
  const [winner, setWinner] = useState(null)

  //Chqueamos si hay un gandor 
  const checkWinner = (boardToCheck) => {
    for (const combo of WINS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
  }

  //Chuqueamos si hay un empate
  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    //No se actualiza la posición y evitamos que se sobrescriba
    if (board[index] || winner) return

    //Actualizamos el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //Actualizamos los turnos
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Verificando si hay un ganador o un empate
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <>
      <main className='board'>
        <h1>Triki</h1>
        <section className='game'>
          {
            board.map((square, index) => {
              return (
                <Square key={index}
                  index={index}
                  updateBoard={updateBoard}
                >
                  {square}
                </Square>
              )
            })
          }
        </section>
        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
        <Winner resetGame={resetGame} winner={winner} />
      </main>
    </>
  )
}

export default App
