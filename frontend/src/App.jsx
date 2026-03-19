import { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import WelcomeMessage from "./components/WelcomeMessage";
import QuickActions from "./components/QuickActions";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import sectionContent from "./data/sectionContent";
import {
  fetchChats,
  createChat as createChatRequest,
  sendMessage as sendMessageRequest,
} from "./services/chatApi";

export default function App() {
  const [activeItem, setActiveItem] = useState("Inicio");
  const [inputValue, setInputValue] = useState("");
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);

  const currentSection = sectionContent[activeItem];

  const activeChat = useMemo(
    () => chats.find((chat) => chat.id === activeChatId) ?? null,
    [chats, activeChatId]
  );

  const activeMessages = activeChat?.messages ?? [];

  useEffect(() => {
    async function loadChats() {
      try {
        setIsLoadingChats(true);
        setError("");

        const data = await fetchChats();
        setChats(data);

        if (data.length > 0) {
          setActiveChatId(data[0].id);
          setActiveItem(data[0].section || "Inicio");
        }
      } catch (err) {
        setError(err.message || "Error al cargar chats");
      } finally {
        setIsLoadingChats(false);
      }
    }

    loadChats();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages, isTyping, activeChatId]);

  const handleSelectSection = (item) => {
    setActiveItem(item);
    setInputValue("");
  };

  const handleSelectAction = (actionText) => {
    setInputValue(actionText);
  };

  const handleSelectChat = (chatId) => {
    const selectedChat = chats.find((chat) => chat.id === chatId);
    if (!selectedChat) return;

    setActiveChatId(chatId);
    setActiveItem(selectedChat.section || "Inicio");
    setInputValue("");
    setIsTyping(false);
  };

  const handleCreateNewChat = async () => {
    try {
      setError("");

      const newChat = await createChatRequest(activeItem);

      setChats((prevChats) => [newChat, ...prevChats]);
      setActiveChatId(newChat.id);
      setActiveItem(newChat.section || activeItem);
      setInputValue("");
      setIsTyping(false);
    } catch (err) {
      setError(err.message || "Error al crear el chat");
    }
  };

  const handleSendMessage = async () => {
    const trimmedMessage = inputValue.trim();

    if (!trimmedMessage || !activeChat || isTyping) return;

    setError("");
    setIsTyping(true);

    try {
      const result = await sendMessageRequest(activeChat.id, {
        section: activeItem,
        message: trimmedMessage,
      });

      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id !== activeChat.id) return chat;
          return result.chat;
        })
      );

      setInputValue("");
    } catch (err) {
      setError(err.message || "Error al enviar el mensaje");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="grid h-screen grid-cols-[320px_1fr] overflow-hidden bg-[#f5f6f8]">
      <Sidebar
        activeItem={activeItem}
        onSelectItem={handleSelectSection}
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onCreateNewChat={handleCreateNewChat}
      />

      <main className="flex h-screen min-h-0 flex-col overflow-hidden">
        <ChatHeader
          title={currentSection.title}
          subtitle={currentSection.subtitle}
        />

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto px-10 py-8">
            <WelcomeMessage message={currentSection.welcomeMessage} />

            {isLoadingChats ? (
              <div className="mt-6 rounded-2xl bg-white px-5 py-4 text-slate-600 shadow-sm">
                Cargando chats...
              </div>
            ) : (
              <>
                {error && (
                  <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
                    {error}
                  </div>
                )}

                <ChatMessages
                  messages={activeMessages}
                  isTyping={isTyping}
                />
              </>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="mb-4 flex justify-center px-6 pt-4">
            <QuickActions
              actions={currentSection.quickActions}
              onSelectAction={handleSelectAction}
            />
          </div>

          <ChatInput
            inputValue={inputValue}
            onChangeInput={setInputValue}
            onSendMessage={handleSendMessage}
          />
        </div>
      </main>
    </div>
  );
}