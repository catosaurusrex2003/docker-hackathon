function Loadinganimation() {
    return (
      <>
        <style jsx>{`
          .spinner {
            width: 3em;
            height: 3em;
            margin:auto auto;
            border: 0.5em solid rgba(0, 0, 0, 0.1);
            border-left-color: #808080;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
  
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
        <div className="spinner"></div>
      </>
    );
  }
  
  export default Loadinganimation;