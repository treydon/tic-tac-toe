const gameBoard = (() => {
    let _board = new Array(9);
    const getField = (num) => _board[num];

    const setField = (num, player) => {
        const htmlField = document.querySelector(`.board button:nth-child(${num}) p`);
        htmlField.textContent = player.getSign();
        _board[num-1] = player.getSign();
    };

    const clear = () => {
        for (let i = 0; i <_board.length; i++) {
            _board[i] = undefined;
        }
    }

    const getEmptyFieldsIdx = () => {
        fields = [];
        for (let i = 0; i < _board.length; i++) {;
            const field = _board[i];
            if (field == undefined) {
                fields.push(i);
            }
        };
        return fields;
    }

    return {
        getField,
        getEmptyFieldsIdx,
        setField,
        clear
    };
})();

const Player = (sign) => {
    let _sign = sign;
    const getSign = () => _sign;
    return {
        getSign
    };
}

const displayController = (() => {
    const htmlBoard = Array.from(document.querySelectorAll('button.field'));

    const clear = () => {
        htmlBoard.forEach(field => {
            const p = field.childNodes[0];
            p.classList = [];
            p.textContent = '';
        })
    }
    return {clear}
})();

const gameController = (() => {
    const _player1 = Player('X');
    const _player2 = Player('O');

    let turns = 0;

    const htmlBoard = Array.from(document.querySelectorAll('button.field'));
    htmlBoard.forEach( field => {
        field.addEventListener('click', e => {
            if (gameBoard.getEmptyFieldsIdx().includes(Number(e.target.id)-1)) {
                if (turns%2 == 0) {
                    turns= turns + 1;
                    gameBoard.setField(Number(e.target.id), _player1);
                }
                else {
                    turns = turns +1;
                    gameBoard.setField(Number(e.target.id), _player2);
                }
                setTimeout(() => gameController.checkWinner(), 1000);
                setTimeout(() => gameController.checkTie(), 1000);
            }
        })
    });

    const htmlReset = document.querySelector('#restart');
    htmlReset.addEventListener('click', e=> {
        displayController.clear();
        gameBoard.clear();
    })

    const checkWinner = () => {
        if (gameBoard.getField(0)==gameBoard.getField(1) && gameBoard.getField(0)==gameBoard.getField(2) && typeof gameBoard.getField(0) !== "undefined") {
            alert (`${gameBoard.getField(0)} wins!`)
        }
        else if (gameBoard.getField(3)==gameBoard.getField(4) && gameBoard.getField(3)==gameBoard.getField(5) && typeof gameBoard.getField(3) !== "undefined") {
            alert (`${gameBoard.getField(3)} wins!`)
        }
        else if (gameBoard.getField(6)==gameBoard.getField(7) && gameBoard.getField(6)==gameBoard.getField(8) && typeof gameBoard.getField(6) !== "undefined") {
            alert (`${gameBoard.getField(6)} wins!`)
        }
        else if (gameBoard.getField(0)==gameBoard.getField(3) && gameBoard.getField(0)==gameBoard.getField(6) && typeof gameBoard.getField(0) !== "undefined") {
            alert (`${gameBoard.getField(0)} wins!`)
        }
        else if (gameBoard.getField(1)==gameBoard.getField(4) && gameBoard.getField(1)==gameBoard.getField(7) && typeof gameBoard.getField(1) !== "undefined") {
            alert (`${gameBoard.getField(1)} wins!`)
        }
        else if (gameBoard.getField(2)==gameBoard.getField(5) && gameBoard.getField(2)==gameBoard.getField(8) && typeof gameBoard.getField(2) !== "undefined") {
            alert (`${gameBoard.getField(2)} wins!`)
        }
        else if (gameBoard.getField(0)==gameBoard.getField(4) && gameBoard.getField(0)==gameBoard.getField(8) && typeof gameBoard.getField(0) !== "undefined") {
            alert (`${gameBoard.getField(0)} wins!`)
        }
        else if (gameBoard.getField(2)==gameBoard.getField(4) && gameBoard.getField(2)==gameBoard.getField(6) && typeof gameBoard.getField(2) !== "undefined") {
            alert (`${gameBoard.getField(2)} wins!`)
        }
    }

    const checkTie = () => {
        if (gameBoard.getEmptyFieldsIdx().length==0) {
            alert (`Tie!`);
        }
    };

    return {checkWinner,
        checkTie
    }

})();