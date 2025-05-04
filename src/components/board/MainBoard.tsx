import BoardCard from './boardCard/BoardCard';

import { mockData } from '../../mock/mockData';

export default function MainBoard() {
  return (
    <section className="flex px-[20px] py-[0px] items-start content-start gap-[20px] flex-wrap">
      {mockData.map((content) => (
        <BoardCard key={content.id} {...content} />
      ))}
    </section>
  );
}
