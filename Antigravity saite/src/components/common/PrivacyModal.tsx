import React from 'react';
import { Modal } from './Modal';
import { Shield, Lock, FileText } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Политика конфиденциальности"
      subtitle="Регламент обработки персональных данных и защиты информации клиентов"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4 text-xs text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
        <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 flex items-start gap-3">
          <Shield className="w-5 h-5 text-cyan-glow shrink-0 mt-0.5" />
          <p>
            Сервисный центр <strong className="text-white">{SITE_CONFIG.name}</strong> строго соблюдает законодательство о защите персональных данных (ФЗ-152) и гарантирует абсолютную безопасность информации на носителях заказчика.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-cyan-glow" />
            1. Защита данных на накопителях клиентов
          </h4>
          <p className="text-slate-400">
            Мы понимаем ценность личных файлов, фотографий, баз данных и рабочих проектов. При проведении аппаратного ремонта инженеры сервиса не копируют, не просматривают и не модифицируют файлы пользователя без прямого поручения заказчика. По желанию клиента накопитель демонтируется при приеме и передается заказчику на руки.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-cyan-glow" />
            2. Обработка контактной информации
          </h4>
          <p className="text-slate-400">
            Номер телефона, имя и мессенджеры, переданные через формы сайта или по телефону, используются исключительно для:
          </p>
          <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-400">
            <li>Согласования стоимости и результатов диагностики устройства;</li>
            <li>Уведомления о готовности техники к выдаче;</li>
            <li>Отправки электронного гарантийного талона.</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-1.5">
            3. Демонстрационный статус сайта
          </h4>
          <p className="text-slate-400">
            Настоящий веб-сайт функционирует в качестве демонстрационного портфолио-проекта современного цифрового сервисного центра. Все формы сохраняют тестовые заявки в локальном хранилище браузера (LocalStorage) для демонстрации интерфейса и не передают конфиденциальные данные третьим лицам.
          </p>
        </div>

        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500">
          Редакция регламента от 2026 года. Контактное лицо по вопросам конфиденциальности: {SITE_CONFIG.contacts.email}
        </div>
      </div>
    </Modal>
  );
};
