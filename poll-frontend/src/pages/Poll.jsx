import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function Poll() {
  const { pollId } = useParams();
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    if (!pollId) return;

    // join socket room
    socket.emit("join_poll", pollId);

    // fetch poll data
    const fetchPoll = async () => {
      try {
        const res = await api.get(`/api/polls/${pollId}`);
        setQuestion(res.data.question);
        setOptions(res.data.options);
      } catch (err) {
        console.error("Failed to load poll", err);
      }
    };

    fetchPoll();

    // listen for live updates
    socket.on("vote_update", (updatedOptions) => {
      setOptions(updatedOptions);
    });

    return () => {
      socket.off("vote_update");
    };
  }, [pollId]);

  const vote = async (optionId) => {
    let voterHash = localStorage.getItem("voterHash");

    if (!voterHash) {
      voterHash = Math.random().toString(36).substring(2);
      localStorage.setItem("voterHash", voterHash);
    }

    try {
      await api.post(`/api/polls/${pollId}/vote`, {
        optionId,
        voterHash
      });
    } catch (err) {
      alert("You have already voted or something went wrong");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{question}</h2>

      {options.map(option => (
        <button
          key={option.id}
          onClick={() => vote(option.id)}
          style={{ display: "block", margin: "10px 0" }}
        >
          {option.text} ({option.votes})
        </button>
      ))}
    </div>
  );
}

export default Poll;

