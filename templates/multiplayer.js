const cells = document.querySelectorAll('[data-cell]');
        let isXTurn = true;

        cells.forEach(cell => {
            cell.addEventListener('click', handleClick, { once: true });
        });

        function handleClick(e) {
            const cell = e.target;
            const currentClass = isXTurn ? 'X' : 'O';
            placeMark(cell, currentClass);
            if (checkWin(currentClass)) {
                setTimeout(() => alert(`${currentClass} wins!`), 100);
                resetGame();
            } else if (isDraw()) {
                setTimeout(() => alert(`It's a draw!`), 100);
                resetGame();
            } else {
                isXTurn = !isXTurn;
            }
        }

        function placeMark(cell, currentClass) {
            cell.textContent = currentClass;
        }

        function checkWin(currentClass) {
            const winningCombinations = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];
            return winningCombinations.some(combination => {
                return combination.every(index => {
                    return cells[index].textContent === currentClass;
                });
            });
        }

        function isDraw() {
            return [...cells].every(cell => {
                return cell.textContent === 'X' || cell.textContent === 'O';
            });
        }

        function resetGame() {
            cells.forEach(cell => {
                cell.textContent = '';
                cell.addEventListener('click', handleClick, { once: true });
            });
            isXTurn = true;
        }
