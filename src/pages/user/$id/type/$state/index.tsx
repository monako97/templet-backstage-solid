import { useParams } from '@moneko/solid';

function UserState() {
  const params = useParams();

  return (
    <div>
      Dynamic router: user/:id/type/:state
      <pre>
        <code>{JSON.stringify(params, null, 2)}</code>
      </pre>
    </div>
  );
}

export default UserState;
