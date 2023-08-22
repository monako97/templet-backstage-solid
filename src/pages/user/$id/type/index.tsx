import { useParams } from '@moneko/solid';

function UserType() {
  const params = useParams();

  return (
    <div>
      Dynamic router: user/:id/type
      <pre>
        <code>{JSON.stringify(params, null, 2)}</code>
      </pre>
    </div>
  );
}

export default UserType;
