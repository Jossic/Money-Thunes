import { useNavigate } from 'react-router-dom';
import { dateParser } from '../../../utils/dateParser';

export default function LateralMenu({ page, links }) {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-[#dfd0d066] sm:w-[100px] lg:w-[250px] min-w-[260px] max-w-[285px] flex flex-col p-1">
      <div className="mt-4 shadow-lg py-2 text-center">
        <h4 className="mb-2">{`Aujourd'hui nous sommes :`}</h4>
        <span>{dateParser(Date.now())}</span>
      </div>
      <div className="text-lg my-8">
        <ul>
          {links.map((link, index) => (
            <li className="my-6 " key={index}>
              <p
                className={link.page === page ? 'lateralLink font-bold ' : 'lateralLink '}
                onClick={() => navigate(`${link.link}`)}>
                {link.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
