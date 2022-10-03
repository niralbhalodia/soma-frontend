import { Toaster } from 'react-hot-toast';

const AllToaster = () => {
  return (
    <Toaster
      position='"top-center"'
      toastOptions={{
        duration: 5000,
        style: {
          background: '#363636',
          color: '#fff',
          minWidth: '300px',
        },
      }}
    />
  );
};

export default AllToaster;
