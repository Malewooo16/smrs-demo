
 const getStatusColor = (status:string) => {
    switch (status) {
      case 'Pending':
        return 'text-orange-500';
      case 'Rejected':
        return 'text-red-500';
      case 'Accepted':
        return 'text-teal-500';
      default:
        return '';
    }
  };

  export default getStatusColor


  