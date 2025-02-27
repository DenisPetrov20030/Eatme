import Layout from '@/components/Layout';
import ChangePasswordLayer from '@/components/layers/ChangePasswordLayer';
import ProfileInfoLayer from '@/components/layers/ProfileInfoLayer';
import ProfileSidebar from '@/components/sidebar/ProfileSidebar';
import useUserStore from '@/store/UserStore';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';

const ProfilePage: React.FC = () => {
    const { nav } = useParams<{ nav: string }>();
    const {logout} = useUserStore()
    const navigate = useNavigate()
    const renderLayout = () => {
        switch (nav) {
          case 'info':
            return <ProfileInfoLayer />;
          case 'password':
            return <ChangePasswordLayer />;
          case 'logout':
            logout()
            navigate('/')
            return
          default:
            return <ProfileInfoLayer />; 
        }
      };
  return (
    <Layout>
      <div className="container mx-auto p-4 flex">
        <div className='m-10 flex space-x-4'>
        {nav && <ProfileSidebar navigate={nav} />}
        {renderLayout()}
      </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
