import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./desktop.scss";

function New(props) {
  return (
    <div className="wrap-item wrap-item-new">
      <span className="label">New!</span>
      {props.children}
    </div>
  );
}

function Popular(props) {
  return (
    <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
      {props.children}
    </div>
  );
}

function Article(props) {
  return (
    <div className="item item-article">
      <h3>
        <a href={props.url}>{props.title}</a>
      </h3>
      <p className="views">Прочтений: {props.views}</p>
    </div>
  );
}

function Video(props) {
  return (
    <div className="item item-video">
      <iframe
        src={props.url}
        title={props.url}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <p className="views">Просмотров: {props.views}</p>
    </div>
  );
}

function ViewsRateUpdate(Components) {
  return function Wraper(props) {
    if (props.views > 1000) {
      return (
        <Popular>
          <Components {...props} />
        </Popular>
      );
    } else if (props.views < 100) {
      return (
        <New>
          <Components {...props} />
        </New>
      );
    } else {
      return <Components {...props} />;
    }
  };
}
const VideoRate = ViewsRateUpdate(Video);
const ArticleRate = ViewsRateUpdate(Article);

function List(props) {
  return props.list.map((item) => {
    switch (item.type) {
      case "video":
        return <VideoRate {...item} key={item.id} />;

      case "article":
        return <ArticleRate {...item} key={item.id} />;
      default:
        return null;
    }
  });
}

export default function SecondTask() {
  // eslint-disable-next-line
  const [list, setList] = useState([
    {
      type: "video",
      url: "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
      views: 50,
      id: uuidv4(),
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
      views: 12,
      id: uuidv4(),
    },
    {
      type: "article",
      title: "Невероятные события в неизвестном поселке...",
      views: 175,
      id: uuidv4(),
    },
    {
      type: "article",
      title: "Секретные данные были раскрыты!",
      views: 1532,
      id: uuidv4(),
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
      views: 4253,
      id: uuidv4(),
    },
    {
      type: "article",
      title: "Кот Бегемот обладает невероятной...",
      views: 12,
      id: uuidv4(),
    },
  ]);

  return <List list={list} />;
}
