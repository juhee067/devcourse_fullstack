import { useCallback } from 'react';

export const useAlert = () => {
  const showAlert = useCallback((message: string) => {
    // useCallback 내에서 화살표 함수를 사용합니다.
    window.alert(message); // window.alert를 사용하여 알림 메시지를 표시합니다.
  }, []); // 의존성 배열을 빈 배열로 설정합니다.

  return showAlert; // showAlert 함수를 반환합니다.
};
