import { useNavigate } from 'react-router-dom';
import Button from './Button';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      type='back'
      onClick={(e) => {
        e.preventDefault();
        navigate(-1); // one step back
      }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='15'
        height='15'
        viewBox='0 0 256 256'
      >
        <path d='M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z'></path>
      </svg>
      Back
    </Button>
  );
};

export default BackButton;
