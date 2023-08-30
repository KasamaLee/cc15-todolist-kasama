// Dependencies
import './App.scss';
import { FaHome, FaInbox, FaCalendar, FaCalendarAlt, FaChevronDown } from 'react-icons/fa';
import Header from '../components/Header';
import ListItem from '../components/ListItem';

function App() {

  const generalLists = [
    { id: 1, text: 'Inbox', icon: <FaInbox />, active: true },
    { id: 2, text: 'Today', icon: <FaCalendar />, active: false },
    { id: 3, text: 'Next 7 Days', icon: <FaCalendarAlt />, active: true },
  ]

  const projectLists = [
    { id: 4, text: 'Project-A', icon: <FaInbox />, active: true },
    { id: 5, text: 'Project-B', icon: <FaInbox />, active: false },
  ]

  return (
    <div className='todo'>
      <div className='todo__header'>
        <Header />
      </div>
      <div className='todo__sidebar'>
        <aside className='sidebar'>

          <section className='sidebar__category'>
            <ul className='list'>
              {/* <ListItem text='Inbox' icon={<FaInbox />} active={true} />
              <ListItem text='Today' icon={<FaCalendar />} active={false} />
              <ListItem text='Next 7 Days' icon={<FaCalendarAlt />} active={false} /> */}

              {generalLists.map((obj) => (
                <ListItem
                  key={obj.id}
                  text={obj.text}
                  icon={obj.icon}
                  active={obj.active}
                />
              ))}
            </ul>
          </section>

          <section className='sidebar__category'>
            <div className='accordion'>

              {/* Toggle */}
              <div className='accordion__toggle'>
                <li className='accordion__item'>
                  <FaChevronDown className='accordion__item__icon accordion__item__active' />
                  <p className='accordion__item__text'>Projects</p>
                </li>
              </div>

              {/* Lists */}
              <ul className='lists'>
                {/* <ListItem text='Project-A' icon={<FaInbox />} active={true} />
                <ListItem text='Project-B' icon={<FaInbox />} active={false} /> */}

                {projectLists.map((obj) => {
                  obj.key = obj.id;
                  delete obj.id;
                  return <ListItem {...obj} />;
                })}
              </ul>

            </div>
          </section>

        </aside>
      </div>
      <div className='todo__content'>TodoContent</div>
    </div>
  );
}

export default App;