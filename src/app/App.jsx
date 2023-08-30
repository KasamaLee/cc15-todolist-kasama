// Dependencies
import './App.scss';
import { FaHome, FaInbox, FaCalendar, FaCalendarAlt, FaChevronDown } from 'react-icons/fa';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import Lists from '../components/Lists';

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

			{/* ---- Header ---- */}
			<div className='todo__header'>
				<Header />
			</div>

			{/* ----- Side bar ---- */}
			<div className='todo__sidebar'>
				<aside className='sidebar'>

					{/* -- General Section -- */}
					<section className='sidebar__category'>
						<Lists data={projectLists} />
					</section>
					{/* -- End of Section -- */}

					{/* -- Accordion Section -- */}
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
							<Lists data={projectLists} />
						</div>
					</section>
					{/* -- End of Section -- */}

				</aside>
			</div>
			{/* ----- End of Side bar ---- */}

			<div className='todo__content'>TodoContent</div>
		</div>
	);
}

export default App;



/*
<ul className='list'>
  // #1
  {projectLists.map((obj) => (
	<ListItem key={obj.id} text={obj.text} icon={obj.icon} active={obj.active} />
  ))}

  // #2
  {projectLists.map((obj) => {
	obj.key = obj.id;
	delete obj.id;
	return <ListItem {...obj} />;
  })}
</ul>
*/