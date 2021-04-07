import RegisterSignIn from '@components/registerSignIn';
import { useState } from 'react';

export default function Register() {
  // idk 'bout enums in js
  // if you read this, please replace this array with an enum
  const stages = ['Sign in', 'Add model', 'Link assets'];
  const [currentStage, setCurrentStage] = useState(stages[0]);
  const handleCompletedSignIn = () => {
    setCurrentStage(stages[1]);
  };

  let content;
  if (currentStage === stages[0]) {
    content = <RegisterSignIn done={handleCompletedSignIn} />;
  } else if (currentStage === stages[1]) {
    console.log('gg');
  }

  return <>{content}</>;
}
