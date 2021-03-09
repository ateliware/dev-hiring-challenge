import React from "react"
import LanguageShow from "./LanguageShow"

class LanguageIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <>
        <ul>
          {
            this.props.languages.map((language) => 
              <li className="name" key={language.id}>
                <LanguageShow
                  language={language} />
              </li>
            )
          }
        </ul>
      </>
    );
  }
}

export default LanguageIndex
