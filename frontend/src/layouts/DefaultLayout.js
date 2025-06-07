import Header from '../components/Header';

const DefaultLayout = ({ children }) => {
  return (
    <div className="theme-bg-secondary theme-transition min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
};

export default DefaultLayout;
