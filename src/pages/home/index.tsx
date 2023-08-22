import { Show, createResource } from 'solid-js';
import { useParams } from '@moneko/solid';
import { fetchHitokoto } from '@/services/hitokoto';

function Home() {
  const params = useParams();
  const [data, { refetch }] = createResource(fetchHitokoto);

  return (
    <div>
      <h4>Home</h4>
      <Show when={params.id}>
        接收到参数:
        <pre>
          <code>{JSON.stringify(params, null, 2)}</code>
        </pre>
      </Show>
      一言: <button onclick={refetch}>重新获取</button>
      <pre>
        <code>{JSON.stringify(data(), null, 2)}</code>
      </pre>
    </div>
  );
}

export default Home;
