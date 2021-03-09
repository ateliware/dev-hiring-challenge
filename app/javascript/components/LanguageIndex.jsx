import React from "react"

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
                {language.name}
              </li>
            )
          }
        </ul>
      </>
    );
  }
}

export default LanguageIndex
