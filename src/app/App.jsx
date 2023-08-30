import './App.scss';
import Header from '../components/Header.jsx';
import ListItem from '../components/ListItem';
import { FaCalendar, FaCalendarAlt, FaInbox } from 'react-icons/fa';

function App() {
  return (
    <div className='todo'>
      <div className="todo__header">
        <Header />
      </div>

      <div className="todo__sidebar">
        <aside className='sidebar'>

          <section className='sidebar__category'>
            <ul className='list'>
              {/* <li className='list__item'> 
                <FaInbox className='list__item__icon' />
                <p className='list__item__text'>Inbox</p>
              </li>
              <li className='list__item'> 
                <FaCalendar className='list__item__icon' />
                <p className='list__item__text'>Today</p>
              </li>
              <li className='list__item'> 
                <FaCalendarAlt className='list__item__icon' />
                <p className='list__item__text'>Next 7 Days</p>
              </li> */}

              <ListItem
                text='Inbox'
                icon={<FaInbox className='list__item__icon' />}
              />
              <ListItem
                text='Today'
                icon={<FaCalendar className='list__item__icon' />}
              />
              <ListItem
                text='Next 7 days'
                icon={<FaCalendarAlt className='list__item__icon' />}
              />
            </ul>
          </section>

          <section className='sidebar__category'></section>
        </aside>
      </div>

      <div className="todo_content">TodoContent</div>
    </div>
  );
}

export default App;

