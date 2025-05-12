import { useState, useEffect, useRef } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useUI } from '../contexts/UIContext'

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 55, 95, 0.6);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(255, 55, 95, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 55, 95, 0);
  }
`

const bellRing = keyframes`
  0% { transform: rotate(0); }
  10% { transform: rotate(10deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(6deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(2deg); }
  60% { transform: rotate(0); }
  100% { transform: rotate(0); }
`

const NotificationButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--glass-background);
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: visible;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    border-radius: 50%;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 
      0 8px 16px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  svg {
    width: 18px;
    height: 18px;
    transition: transform 0.3s ease;
    ${props => props.$hasUnread && css`
      animation: ${bellRing} 1.5s ease infinite;
      animation-delay: 2s;
    `}
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`

const NotificationBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: linear-gradient(135deg, #FF375F, #FF7A97);
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: white;
  border: 1.5px solid var(--primary);
  transform: scale(${props => props.$hasUnread ? 1 : 0});
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 2px 5px rgba(255, 55, 95, 0.5);
  animation: ${pulse} 2s infinite ease-in-out;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  z-index: 5;
  white-space: nowrap;
  overflow: visible;
  line-height: 1;
  box-sizing: content-box;
`

const NotificationContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 80px;
  width: 400px;
  max-width: calc(100vw - 40px);
  background: var(--glass-background);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: 20px;
  border: 1px solid var(--glass-border);
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.07),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  z-index: 1000;
  max-height: calc(100vh - 120px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${props => props.$isOpen ? slideIn : slideOut} 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transform: translateX(${props => props.$isOpen ? 0 : '100%'});
  opacity: ${props => props.$isOpen ? 1 : 0};
  pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
    border-radius: 20px;
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    top: 70px;
    right: 10px;
    max-width: calc(100vw - 20px);
  }
`

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 5%;
    width: 90%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  }
`

const HeaderTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.5px;
  margin: 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 16px;
    background: var(--accent-blue);
    border-radius: 2px;
    opacity: 0.8;
  }
`

const NotificationTabs = styled.div`
  display: flex;
  gap: 16px;
  margin: 4px 24px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  position: relative;
`

const TabButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.$active ? 'var(--text-primary)' : 'var(--text-tertiary)'};
  font-size: 14px;
  cursor: pointer;
  padding: 6px 0;
  position: relative;
  font-weight: ${props => props.$active ? 600 : 500};
  transition: all 0.3s ease;
  letter-spacing: -0.3px;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${props => props.$active ? '100%' : '0%'};
    height: 2px;
    background: linear-gradient(90deg, var(--accent-blue), var(--accent-teal));
    border-radius: 2px;
    transition: all 0.3s ease;
    opacity: ${props => props.$active ? 1 : 0};
  }

  &:hover {
    color: var(--text-primary);
    
    &::after {
      width: 100%;
      opacity: 0.5;
    }
  }
`

const ClearButton = styled.button`
  background: none;
  border: none;
  color: var(--accent-blue);
  font-size: 13px;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 6px;
  transition: all 0.25s ease;
  margin-left: auto;
  font-weight: 500;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 113, 227, 0.08);
    border-radius: 6px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s ease;
  }

  &:hover {
    color: var(--accent-teal);
    
    &::before {
      transform: scaleX(1);
    }
  }
`

const NotificationList = styled.div`
  overflow-y: auto;
  flex: 1;
  padding: 16px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  @media (max-width: 768px) {
    max-height: 60vh;
  }
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: var(--text-tertiary);
  text-align: center;

  svg {
    width: 48px;
    height: 48px;
    margin-bottom: 20px;
    color: var(--text-tertiary);
    opacity: 0.5;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  }

  h4 {
    font-size: 16px;
    margin: 0 0 10px 0;
    color: var(--text-secondary);
    font-weight: 600;
    letter-spacing: -0.3px;
  }

  p {
    font-size: 14px;
    margin: 0;
    color: var(--text-tertiary);
    max-width: 260px;
    line-height: 1.5;
  }
`

const slideInNotification = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const NotificationItem = styled.div`
  padding: 16px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 14px;
  margin-bottom: 10px;
  cursor: pointer;
  position: relative;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  transition: all 0.25s ease;
  animation: ${slideInNotification} 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: ${props => props.$index * 0.05}s;
  opacity: 0;
  transform: translateY(10px);
  border-left: 3px solid ${props => 
    props.$type === 'success' ? 'var(--accent-teal)' :
    props.$type === 'warning' ? 'var(--accent-orange)' :
    props.$type === 'error' ? 'var(--accent-pink)' : 'var(--accent-blue)'};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  &:hover {
    background: rgba(255, 255, 255, 0.07);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  ${props => props.$unread && css`
    &::before {
      content: '';
      position: absolute;
      top: 16px;
      left: -7px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-pink), #FF7A97);
      box-shadow: 0 0 8px rgba(255, 55, 95, 0.5);
      animation: ${pulse} 2s infinite ease-in-out;
    }
  `}
`

const IconContainer = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${props => 
    props.$type === 'success' ? 'rgba(45, 193, 180, 0.15)' :
    props.$type === 'warning' ? 'rgba(255, 149, 0, 0.15)' :
    props.$type === 'error' ? 'rgba(255, 55, 95, 0.15)' : 'rgba(0, 113, 227, 0.15)'};
  color: ${props => 
    props.$type === 'success' ? 'var(--accent-teal)' :
    props.$type === 'warning' ? 'var(--accent-orange)' :
    props.$type === 'error' ? 'var(--accent-pink)' : 'var(--accent-blue)'};
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
    border-radius: 14px;
  }

  svg {
    width: 20px;
    height: 20px;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.1));
  }
  
  ${NotificationItem}:hover & {
    transform: scale(1.05);
  }
`

const NotificationContent = styled.div`
  flex: 1;
  overflow: hidden;
`

const NotificationTitle = styled.h4`
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 6px 0;
  letter-spacing: -0.3px;
`

const NotificationMessage = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 10px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const NotificationTime = styled.span`
  font-size: 12px;
  color: var(--text-tertiary);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  
  &::before {
    content: '';
    display: inline-block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: var(--text-tertiary);
    margin-right: 2px;
  }
`

const NotificationFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 5%;
    width: 90%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
  }
`

const SettingsButton = styled.button`
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
`

// Icons
const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
)

const InboxEmptyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-6l-2 3h-4l-2-3H2"></path>
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
  </svg>
)

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
)

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
)

const SuccessIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
)

const WarningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
)

const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
)

const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [notifications, setNotifications] = useState([])
  const containerRef = useRef(null)
  const { uiState, openUI, closeUI } = useUI()
  const isOpen = uiState.isNotificationOpen
  const hasUnread = notifications.some(n => !n.read)
  const bellRef = useRef(null)

  useEffect(() => {
    // Generate fake notifications
    const fakeNotifications = [
      {
        id: 1,
        type: 'info',
        title: 'Welcome to Humanity Bridge',
        message: 'Thank you for joining our platform. Together we can make a difference in communities worldwide.',
        time: 'Just now',
        read: false
      },
      {
        id: 2,
        type: 'warning',
        title: 'Scheduled Maintenance',
        message: 'Our platform will be undergoing scheduled maintenance from June 15-17. Some features may be temporarily unavailable.',
        time: '2 hours ago',
        read: false
      }
    ]
    setNotifications(fakeNotifications)
  }, [])

  const handleClickOutside = (event) => {
    // Don't close if clicking the bell button
    if (bellRef.current && bellRef.current.contains(event.target)) {
      return;
    }
    
    // Close if clicking outside the notification container
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      closeUI('isNotificationOpen');
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const toggleNotifications = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    console.log("Notification state before toggle:", isOpen);
    
    if (isOpen) {
      console.log("Closing notifications");
      closeUI('isNotificationOpen');
    } else {
      console.log("Opening notifications");
      openUI('isNotificationOpen');
    }
  }

  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(n => ({ ...n, read: true }))
    )
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const markAsRead = (id) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      )
    )
  }

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'unread':
        return notifications.filter(n => !n.read)
      case 'all':
      default:
        return notifications
    }
  }

  const filteredNotifications = getFilteredNotifications()
  const unreadCount = notifications.filter(n => !n.read).length

  // Get icon component based on notification type
  const getIconComponent = (type) => {
    switch (type) {
      case 'success':
        return <SuccessIcon />
      case 'warning':
        return <WarningIcon />
      case 'error':
        return <ErrorIcon />
      case 'info':
      default:
        return <InfoIcon />
    }
  }

  return (
    <>
      <NotificationButton 
        onClick={toggleNotifications} 
        $hasUnread={hasUnread}
        ref={bellRef}
      >
        <BellIcon />
        <NotificationBadge $hasUnread={hasUnread}>
          {unreadCount}
        </NotificationBadge>
      </NotificationButton>

      <NotificationContainer 
        $isOpen={isOpen} 
        ref={containerRef}
      >
        <NotificationHeader>
          <HeaderTitle>Notifications</HeaderTitle>
          {unreadCount > 0 && (
            <ClearButton onClick={markAllAsRead}>Mark all as read</ClearButton>
          )}
        </NotificationHeader>

        <NotificationTabs>
          <TabButton 
            $active={activeTab === 'all'} 
            onClick={() => setActiveTab('all')}
          >
            All
          </TabButton>
          <TabButton 
            $active={activeTab === 'unread'} 
            onClick={() => setActiveTab('unread')}
          >
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </TabButton>
          {notifications.length > 0 && (
            <ClearButton onClick={clearAllNotifications}>
              Clear all
            </ClearButton>
          )}
        </NotificationTabs>

        <NotificationList>
          {filteredNotifications.length === 0 ? (
            <EmptyState>
              <InboxEmptyIcon />
              <h4>No notifications</h4>
              <p>When you receive notifications, they'll appear here</p>
            </EmptyState>
          ) : (
            filteredNotifications.map((notification, index) => (
              <NotificationItem 
                key={notification.id}
                $type={notification.type}
                $unread={!notification.read}
                $index={index}
                onClick={() => markAsRead(notification.id)}
              >
                <IconContainer $type={notification.type}>
                  {getIconComponent(notification.type)}
                </IconContainer>
                <NotificationContent>
                  <NotificationTitle>{notification.title}</NotificationTitle>
                  <NotificationMessage>{notification.message}</NotificationMessage>
                  <NotificationTime>{notification.time}</NotificationTime>
                </NotificationContent>
              </NotificationItem>
            ))
          )}
        </NotificationList>

        <NotificationFooter>
          <SettingsButton>
            <SettingsIcon />
            Notification Settings
          </SettingsButton>
        </NotificationFooter>
      </NotificationContainer>
    </>
  )
}

export default NotificationCenter 