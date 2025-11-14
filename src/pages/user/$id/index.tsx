import { t } from 'app:locales';
import { useNavigate, useParams } from '@moneko/solid';

function User() {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div>
      {t['user/:id']}
      <n-button onClick={() => navigate('csasa?menuId=user/:id')}>跳转到下一个子路由</n-button>
      <n-code lang="js" code={JSON.stringify(params, null, 2)} />
    </div>
  );
}

export default User;
