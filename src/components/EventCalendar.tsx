"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [isClient, setIsClient] = useState(false); // Добавим состояние для отслеживания клиентского рендеринга
  const router = useRouter();

  // Обновление состояния, чтобы дождаться клиентского рендеринга
  useEffect(() => {
    setIsClient(true); // После первого рендера устанавливаем флаг
  }, []);

  // Отправка даты в URL только на клиенте
  useEffect(() => {
    if (isClient && value instanceof Date) {
      router.push(`?date=${value}`);
    }
  }, [value, router, isClient]);

  if (!isClient) {
    return null; // На сервере ничего не рендерим, чтобы избежать ошибок гидратации
  }

  return <Calendar onChange={onChange} value={value} />;
};

export default EventCalendar;
