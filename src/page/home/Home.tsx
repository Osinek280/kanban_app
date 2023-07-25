import { ReactNode } from 'react';
import KanbanImage from '../../assets/image/kanban-image.svg'

function Home({ children }: { children: ReactNode }) {
  return (
    <div className='home-container'>
      <header className='home-header'>What do you want to do today?</header>
      <div className='con'>
        <div className='kanban-state'>
          <span className='kanban-state-text'>Kanban</span>
          <img src={KanbanImage} alt='kanban-img' />
        </div>
        <div className='home-right-side'>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Home;
