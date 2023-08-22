import { useParams } from '@moneko/solid';

function User() {
  const params = useParams();

  return (
    <div>
      Dynamic router: user/:id
      <pre>
        <code>{JSON.stringify(params, null, 2)}</code>
      </pre>
    </div>
  );
}

export default User;
