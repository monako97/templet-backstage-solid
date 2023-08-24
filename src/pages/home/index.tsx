import { createResource } from 'solid-js';
import { t } from '@app/locales';
import { fetchHitokoto } from '@/services/hitokoto';

function Home() {
  const [data, { refetch }] = createResource(fetchHitokoto);

  return (
    <div>
      <n-typography tag="h4" type="primary">
        {t.hitokoto}:
        <n-button onClick={refetch}>
          <span>{t.refetch}</span>
        </n-button>
      </n-typography>
      <n-code lang="js" line-number={true} toolbar={true} code={JSON.stringify(data(), null, 2)} />
    </div>
  );
}

export default Home;
