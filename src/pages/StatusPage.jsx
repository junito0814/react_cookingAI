import React from 'react'
import { useParams, Link } from 'react-router-dom';
import ContentCard from '../components/ContentCard';

const StatusPage = ({ contents }) => {
    const { statusName } = useParams();

    const filter = contents.filter((c) => c.status === statusName);
  return (
    <div>
          <h2>{statusName}</h2>
          
          {filter.length === 0 ? (
              <p>まだありません。「生成する」から作ってみましょう。</p>
          ) : (
              filter.map((item) => (
                  <Link
                      key={item.id}
                      to={`/edit/${item.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                  >
                      <ContentCard
                          key={item.id}
                          name={item.name}
                          body={item.body}
                          status={item.status}
                      />
                  </Link>
              ))
          )}

    </div>
  )
}

export default StatusPage;