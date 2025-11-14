import { t } from 'app:locales';
import { useParams } from '@moneko/solid';

function UserState() {
  const params = useParams();

  return (
    <div>
      {t['user/:id/:state']}
      <n-code lang="js" code={JSON.stringify(params, null, 2)} />
    </div>
  );
}

export default UserState;
