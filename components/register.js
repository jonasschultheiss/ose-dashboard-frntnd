import RegisterAddModel from '@components/registerAddModel';
import RegisterLinkAssets from '@components/registerLinkAssets';
import RegisterNav from '@components/registerNav';
import RegisterSignIn from '@components/registerSignIn';
import { useAuth } from 'contexts/authContext';
import { useState } from 'react';

export default function Register() {
  // idk 'bout enums in js
  // if you read this, please replace this array with an enum
  const stages = ['Sign in', 'Add model', 'Link assets'];
  const [currentStage, setCurrentStage] = useState(stages[0]);
  const [model, setModel] = useState();
  const { logout } = useAuth();

  const handleCompletedSignIn = () => {
    setCurrentStage(stages[1]);
  };

  const handleAddedModel = createdModel => {
    setModel(createdModel);
    setCurrentStage(stages[2]);
  };

  const handleLinkedModel = () => {
    logout();
  };

  let content;
  switch (currentStage) {
    case stages[0]: {
      content = <RegisterSignIn done={handleCompletedSignIn} />;
      break;
    }
    case stages[1]: {
      content = <RegisterAddModel done={handleAddedModel} />;
      break;
    }
    case stages[2]: {
      content = <RegisterLinkAssets done={handleLinkedModel} model={model} />;
      break;
    }
  }

  return (
    <>
      <RegisterNav stages={stages} currentStage={currentStage} />
      {content}
    </>
  );
}
