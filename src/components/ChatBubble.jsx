const ChatBubble = ({ message, domainColor }) => {
  const isAI = message.role === "ai";
  return (
    <div style={{ ...S.bubble, ...(isAI ? S.bubbleAI : S.bubbleUser) }}>
      {isAI && (
        <span style={{ ...S.dot, background: domainColor || "#FF6B35" }} />
      )}
      <div style={S.text}>{message.text}</div>
    </div>
  );
};

const S = {
  bubble: {
    padding: "10px 14px",
    borderRadius: 3,
    maxWidth: "90%",
    fontSize: 13,
    animation: "fadeUp 0.18s ease",
  },
  bubbleAI: {
    background: "#111",
    border: "1px solid #1a1a1a",
    alignSelf: "flex-start",
    display: "flex",
    gap: 8,
    alignItems: "flex-start",
  },
  bubbleUser: {
    background: "rgba(255,107,53,0.07)",
    border: "1px solid rgba(255,107,53,0.12)",
    alignSelf: "flex-end",
    color: "#ccc",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    flexShrink: 0,
    marginTop: 5,
    display: "inline-block",
  },
  text: {
    whiteSpace: "pre-wrap",
    lineHeight: 1.6,
    fontSize: 13,
    color: "#bbb",
  },
};

export default ChatBubble;