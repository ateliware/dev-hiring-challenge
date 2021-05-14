import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Collapse, Card, CardBody } from 'reactstrap';

import Styles from './styles';

function MainItemList({
  noDetails,
  data,
  onAddRequest = () => {},
  onRemoveRequest = () => {},
}) {
  const [opened, setOpened] = useState(false);

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    toast.success('Link copiado');
  }

  return (
    <Styles.Container>
      <Styles.Header opened={opened ? 1 : 0}>
        <Styles.ItemName>
          {data.name}
        </Styles.ItemName>
        <Styles.ItemControlsContainer>

          {noDetails
            ? <Styles.IncludeIcon title="Incluir repositório" onClick={onAddRequest} />
            : (
              <>
                <Styles.RemoveIcon title="Remover repositório" onClick={onRemoveRequest} />
                <Styles.ExpandIcon title="Ver detalhes" opened={opened ? 1 : 0} onClick={() => setOpened(!opened)} />
              </>
            )}

        </Styles.ItemControlsContainer>
      </Styles.Header>

      {!noDetails && (
        <Collapse isOpen={opened}>
          <Card>
            <CardBody>
              <p>
                <strong className="font-weight-bold">Nome:</strong>
                <span className="ml-2">{data.name || '-'}</span>
              </p>
              <p>
                <strong className="font-weight-bold">Nome completo:</strong>
                <span className="ml-2">{data.full_name || '-'}</span>
              </p>
              <p>
                <strong className="font-weight-bold">Descrição:</strong>
                <span className="ml-2">{data.description || '-'}</span>
              </p>
              <p>
                <strong className="font-weight-bold">Link do repositório:</strong>
                <a className="ml-2" href={data.html_url} target="_blank" rel="noreferrer">{data.html_url}</a>
              </p>
              <p>
                <strong className="font-weight-bold">Link para clone:</strong>
                <a className="ml-2" href="#" onClick={() => copyToClipboard(data.clone_url)}>{data.clone_url}</a>
              </p>
              <p>
                <strong className="font-weight-bold">Linguagem:</strong>
                <span className="ml-2">{data.language || '-'}</span>
              </p>
              <p>
                <strong className="font-weight-bold">Branch principal:</strong>
                <span className="ml-2">{data.default_branch || '-'}</span>
              </p>
              <p>
                <strong className="font-weight-bold">Número de forks:</strong>
                <span className="ml-2">{data.forks_count || '-'}</span>
              </p>
              <p>
                <strong className="font-weight-bold">Issues abertas:</strong>
                <span className="ml-2">{data.open_issues || '-'}</span>
              </p>

            </CardBody>
          </Card>
        </Collapse>
      ) }

    </Styles.Container>
  );
}

export default MainItemList;
