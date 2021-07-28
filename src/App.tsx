import { observer } from 'mobx-react-lite'

import Test from './test'



const App = () => {
    return (
        <div className="App">
            <Test />
        </div>
    );
}

export default observer(App)
