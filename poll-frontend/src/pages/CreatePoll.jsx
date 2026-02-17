import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const navigate = useNavigate();

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const createPoll = async () => {
    const filteredOptions = options.filter(opt => opt.trim() !== "");

    if (!question || filteredOptions.length < 2) {
      alert("Please enter a question and at least 2 options");
      return;
    }

    try {
      const res = await api.post("/api/polls", {
        question,
        options: filteredOptions
      });

      navigate(`/poll/${res.data.pollId}`);
    } catch (err) {
      console.log(err);
      alert("Failed to create poll");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create a Poll</h2>

      <input
        type="text"
        placeholder="Poll question"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        style={{ width: "100%", padding: "8px" }}
      />

      <h4>Options</h4>
      {options.map((opt, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Option ${i + 1}`}
          value={opt}
          onChange={e => updateOption(i, e.target.value)}
          style={{ display: "block", margin: "8px 0", width: "100%", padding: "8px" }}
        />
      ))}

      <button onClick={addOption}>+ Add option</button>
      <br /><br />
      <button onClick={createPoll}>Create Poll</button>
    </div>
  );
}

export default CreatePoll;
