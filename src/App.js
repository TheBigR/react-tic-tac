import React, { useState, useEffect } from 'react'

const rowStyle = {
  display: 'flex',
}

const patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const squareStyle = {
  width: '60px',
  height: '60px',
  backgroundColor: '#ddd',
  margin: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  color: 'white',
}

const boardStyle = {
  backgroundColor: '#eee',
  width: '208px',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  border: '3px #eee solid',
}

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}

const instructionsStyle = {
  marginTop: '5px',
  marginBottom: '5px',
  fontWeight: 'bold',
  fontSize: '16px',
}

const buttonStyle = {
  marginTop: '15px',
  marginBottom: '16px',
  width: '80px',
  height: '40px',
  backgroundColor: '#8acaca',
  color: 'white',
  fontSize: '16px',
}

function Square({ val, chooseSquare }) {
  return (
    <div className="square" style={squareStyle} onClick={chooseSquare}>
      {val}
    </div>
  )
}

function Board() {
  const [gameBoard, setGameBoard] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ])
  const [player, setPlayer] = useState('O')
  const [result, setResult] = useState({ winner: 'none', state: 'none' })

  useEffect(() => {
    checkWin()
    checkIfTie()

    if (player === 'X') {
      setPlayer('O')
    } else {
      setPlayer('X')
    }
  }, [gameBoard])

  useEffect(() => {
    if (result.state !== 'none') {
      alert(`Game finished! winning player: ${result.winner}`)
      restartGame()
    }
  }, [result])

  const choooseSquare = (square) => {
    setGameBoard(
      gameBoard.map((val, idx) => {
        if (idx === square && val === '') {
          return player
        }
        return val
      }),
    )
  }

  const checkWin = () => {
    patterns.forEach((currPattern) => {
      const firstPlayer = gameBoard[currPattern[0]]
      if (firstPlayer === '') return
      let foundWinningPattern = true
      currPattern.forEach((idx) => {
        if (gameBoard[idx] !== firstPlayer) {
          foundWinningPattern = false
        }
      })

      if (foundWinningPattern) {
        setResult({ winner: player, state: 'Won' })
      }
    })
  }

  const checkIfTie = () => {
    let filled = true
    gameBoard.forEach((square) => {
      if (square === '') {
        filled = false
      }
    })
    if (filled) {
      setResult({ winner: 'no one', state: 'Tie' })
    }
  }

  const restartGame = () => {
    setGameBoard(['', '', '', '', '', '', '', '', ''])
    setPlayer('O')
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: <span>{player}</span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner: <span>{result.winner}</span>
      </div>
      <button style={buttonStyle} onClick={restartGame}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square
            val={gameBoard[0]}
            chooseSquare={() => {
              choooseSquare(0)
            }}
          />
          <Square
            val={gameBoard[1]}
            chooseSquare={() => {
              choooseSquare(1)
            }}
          />
          <Square
            val={gameBoard[2]}
            chooseSquare={() => {
              choooseSquare(2)
            }}
          />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square
            val={gameBoard[3]}
            chooseSquare={() => {
              choooseSquare(3)
            }}
          />
          <Square
            val={gameBoard[4]}
            chooseSquare={() => {
              choooseSquare(4)
            }}
          />
          <Square
            val={gameBoard[5]}
            chooseSquare={() => {
              choooseSquare(5)
            }}
          />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square
            val={gameBoard[6]}
            chooseSquare={() => {
              choooseSquare(6)
            }}
          />
          <Square
            val={gameBoard[7]}
            chooseSquare={() => {
              choooseSquare(7)
            }}
          />
          <Square
            val={gameBoard[8]}
            chooseSquare={() => {
              choooseSquare(8)
            }}
          />
        </div>
      </div>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  )
}

export default App
