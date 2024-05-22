import { useNavigate } from 'react-router-dom';

const useMyNavigate = () => {
  const navigate = useNavigate();

  const myNavigate = (path) => {
    navigate(path);
  };

  return myNavigate;
};

export default useMyNavigate;