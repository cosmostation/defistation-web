import React from 'react';
import { MobXProviderContext } from 'mobx-react';

/**
 * React hooks를 사용하는 컴포넌트에서 store를 가져올 때 사용한다.
 * 참조) https://mobx-react.js.org/recipes-migration#hooks-for-the-rescue
 */
function useStores() {
  return React.useContext(MobXProviderContext);
}

export default useStores;