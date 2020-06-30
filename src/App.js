import React, {Component} from 'react';
import axios from 'axios'

class App extends Component {

    async clickHandler() {
        const data = {
            domain: "intents:\n  - greet\n  - goodbye\n  - affirm\n  - deny\n  - mood_great\n  - mood_unhappy\n\nactions:\n  - utter_greet\n  - utter_cheer_up\n  - utter_did_that_help\n  - utter_happy\n  - utter_goodbye\n\ntemplates:\n  utter_greet:\n  - text: \"Hey! How are you?\"\n\n  utter_cheer_up:\n  - text: \"Here is something to cheer you up:\"\n    image: \"https://i.imgur.com/nGF1K8f.jpg\"\n\n  utter_did_that_help:\n  - text: \"Did that help you?\"\n\n  utter_happy:\n  - text: \"Great carry on!\"\n\n  utter_goodbye:\n  - text: \"Bye\"",
            config: "language: en\npipeline: supervised_embeddings\npolicies:\n  - name: MemoizationPolicy\n  - name: KerasPolicy",
            nlu: "## intent:greet\n- hey\n- hello\n- hi\n## intent:goodbye\n- bye\n- goodbye\n- have a nice day\n- see you\n## intent:affirm\n- yes\n- indeed\n## intent:deny\n- no\n- never\n## intent:mood_great\n- perfect\n- very good\n- great\n## intent:mood_unhappy\n- sad\n- not good\n- unhappy",
            stories: "## happy path\n* greet\n\n  - utter_greet\n\n* mood_great\n\n  - utter_happy\n\n## sad path 1\n* greet\n\n  - utter_greet\n\n* mood_unhappy\n\n  - utter_cheer_up\n\n  - utter_did_that_help\n\n* affirm\n\n  - utter_happy\n\n## sad path 2\n* greet\n\n  - utter_greet\n\n* mood_unhappy\n\n  - utter_cheer_up\n\n  - utter_did_that_help\n\n* deny\n\n  - utter_goodbye\n\n## say goodbye\n* goodbye\n\n  - utter_goodbye",
            force: false,
            save_to_default_model_directory: true
        };
        try {
            const response = await axios.post('http://srv8-mambeala:5005/model/train', data);
            console.log(response);
            console.log(response.headers);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div>
                <header>
                    <button onClick={this.clickHandler}>Train model</button>
                </header>
            </div>
        );
    }
}

export default App;