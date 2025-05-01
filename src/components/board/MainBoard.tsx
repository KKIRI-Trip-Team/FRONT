import contents from '../../mock/mockData.json';

import BoardCard from './boardCard/BoardCard';

export default function MainBoard() {
  return (
    <section className="flex px-[20px] py-[0px] items-start content-start gap-[20px] flex-wrap">
      {contents.map((content) => (
        <BoardCard key={content.id} {...content} />
      ))}
    </section>
  );
}
