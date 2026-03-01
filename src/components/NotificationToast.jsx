import React from 'react';
import { toast } from 'react-toastify';

const NotificationContent = ({ title, subtitle, type = 'info', actionText, onAction, closeToast }) => {
    // Determine styles based on type
    const config = {
        info: {
            icon: '!',
            iconBg: 'bg-[#FF8A3D]',
            iconText: 'text-[#3A2618]',
            iconShadow: 'shadow-[0_2px_10px_rgba(255,138,61,0.3)]',
            border: 'border-[#FF8A3D]/40',
            btnBg: 'bg-[#FF8A3D]',
            btnHover: 'hover:bg-[#ff9c59]',
            btnShadow: 'shadow-[0_4px_14px_rgba(255,138,61,0.4)]',
        },
        success: {
            icon: '✓',
            iconBg: 'bg-green-500',
            iconText: 'text-white',
            iconShadow: 'shadow-[0_2px_10px_rgba(34,197,94,0.3)]',
            border: 'border-green-500/40',
            btnBg: 'bg-green-500',
            btnHover: 'hover:bg-green-400',
            btnShadow: 'shadow-[0_4px_14px_rgba(34,197,94,0.4)]',
        },
        error: {
            icon: '✕',
            iconBg: 'bg-red-500',
            iconText: 'text-white',
            iconShadow: 'shadow-[0_2px_10px_rgba(239,68,68,0.3)]',
            border: 'border-red-500/40',
            btnBg: 'bg-red-500',
            btnHover: 'hover:bg-red-400',
            btnShadow: 'shadow-[0_4px_14px_rgba(239,68,68,0.4)]',
        }
    };

    const currentConfig = config[type] || config.info;

    return (
        <div className={`flex items-center justify-between px-3 py-2 w-full max-w-[420px] gap-4 bg-[#3A2618] rounded-full border ${currentConfig.border} p-1 shadow-2xl`}>

            {/* Icon Area */}
            <div className="flex-shrink-0 flex items-center justify-center pl-1">
                <div className={`${currentConfig.iconBg} w-7 h-7 rounded-full flex items-center justify-center ${currentConfig.iconText} font-bold text-lg leading-none ${currentConfig.iconShadow}`}>
                    {currentConfig.icon}
                </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col flex-grow justify-center py-1">
                <h4 className="text-white text-[15px] font-semibold tracking-wide m-0 leading-tight drop-shadow-sm">
                    {title}
                </h4>
                {subtitle && (
                    <p className="text-[#D0C4B8] text-[13px] m-0 mt-0.5 font-medium tracking-wide">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Action Button */}
            {actionText && (
                <div className="flex-shrink-0 ml-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onAction) onAction();
                            if (closeToast) closeToast();
                        }}
                        className={`${currentConfig.btnBg} ${currentConfig.btnHover} text-white text-sm font-bold tracking-wide py-2.5 px-5 rounded-full ${currentConfig.btnShadow} transition-all transform hover:-translate-y-0.5 active:scale-95 whitespace-nowrap`}
                    >
                        {actionText}
                    </button>
                </div>
            )}
        </div>
    );
};

// Reusable function to trigger this specific premium toast
const triggerNotification = ({ title, subtitle, type, actionText, onAction }) => {
    toast(
        <NotificationContent
            title={title}
            subtitle={subtitle}
            type={type}
            actionText={actionText}
            onAction={onAction}
        />,
        {
            className: '!bg-transparent !p-0 !m-0 !shadow-none !min-h-0 !w-auto !max-w-max mx-auto',
            bodyClassName: '!p-0 !m-0 !flex !items-center',
            closeButton: false,
            hideProgressBar: true,
            autoClose: 3000,
        }
    );
};

export const showPremiumNotification = (args) => triggerNotification({ ...args, type: 'info' });
export const showSuccessNotification = (title, subtitle) => triggerNotification({ title, subtitle, type: 'success' });
export const showErrorNotification = (title, subtitle) => triggerNotification({ title, subtitle, type: 'error' });

export default NotificationContent;
