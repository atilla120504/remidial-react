import React, { useEffect, useState } from "react";

export function Bikin() {
  const [data, setData] = useState([]);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          {
            id: 1,
            judul: "ini judul baru",
            article: "article di konten",
            completed: false,
          },
          {
            id: 2,
            judul: "Fix the bug at the projects",
            article: "ini adalah article di konten",
            completed: false,
          },
          {
            id: 3,
            judul: "Meeting with my team",
            article: "ini adalah article di konten",
            completed: false,
          },
        ];
  });

  const [judul, setJudul] = useState("");
  const [article, setArticle] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    console.log("Button siap");
    const newTask = {
      id: Date.now(),
      judul,
      article,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setJudul("");
    setArticle("");
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((response) => response.json())
      .then((data) => setData(data.posts))
      .catch((error) => console.error("Fetching data error", error));
  }, []);

  return (
    <div>
      <h1 style={{ paddingLeft:"3%", display: "flex", justifyContent: "row" }}>My Blug</h1>
      <form id="judulArticle">
        <input
          type="text"
          id="judulArticle"
          placeholder="Masukan Judul Article"
          value={judul}
          onChange={(event) => setJudul(event.target.value)}
          style={{
            borderRadius: "10px",
            padding: "15px",
            width: "90%",
            margin: "20px",
            paddingLeft:"30px"
          }}
        />
      </form>

      <form id="kontenArticle">
    <input
      type="text"
      id="kontenArticle"
      placeholder="Masukan konten artikel"
      value={article}
      onChange={(event) => setArticle(event.target.value)}
      style={{
        borderRadius: "10px",
        padding: "20px",
        width: "90%",
        margin: "20px",
      }}
    />
  </form>

  <button
    onClick={addTask}
    style={{
      backgroundColor: "blue",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "10px",
      margin: "20px",
      width: "100%",
    }}
  >
    Add Post
  </button>

  {tasks.map((task) => (
    <div
      key={task.id}
      style={{ backgroundColor: "white", border: "1px solid black" }}
    >
      <h3>{task.judul}</h3>
      <p>{task.article}</p>
      <button
        onClick={() => deleteTask(task.id)}
        style={{
          backgroundColor: "red",
          color:"white",
          padding: "5px 5px",
          border: "black",
          borderRadius: "5  px",
        }}
      >
        Delete
      </button>
    </div>
  ))}

  {data.map((item, index) => (
    <div
      key={index}
      style={{ backgroundColor: "white", border: "1px solid black" }}
    >
      <h2>{item.judul}</h2>
      <h4 style={{ margin: "10px", fontSize: "bold" }}>-{item.tags}-</h4>
      <h5>{item.views} penonton</h5>
      <p>{item.body}</p>
      <button onClick={() => deleteTask(item.id)}  style={{backgroundColor:"red",color:"white", borderRadius:"5px"}}>Delete</button>
    </div>
  ))}
</div>
  );
}
