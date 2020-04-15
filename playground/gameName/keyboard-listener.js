export default function createKeyboardListener() {
            const state = {
                observers: []
            }

            function subscribe(observerFunction) {
                state.observers.push(observerFunction)
            }

            function notifyAll(command) {
                for (const observerFunction of state.observers) {
                    observerFunction(command)
                }
            }
            
            document.addEventListener('keydown', handleKeydown)

            function handleKeydown(event) {
                const keyPressed = event.key

                const command = {
                    playerId: 'player2',
                    keyPressed
                }

                //game.movePlayer(command)
                notifyAll(command)
            }

            return {
                subscribe
            }
        }