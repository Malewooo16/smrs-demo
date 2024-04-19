
export const getStatusColor = (status:string) => {
    switch (status) {
      case 'Pending':
        return 'text-orange-500';
      case 'denied':
        return 'text-red-500';
      case 'accepted':
        return 'text-teal-500';
      default:
        return '';
    }
  };
  