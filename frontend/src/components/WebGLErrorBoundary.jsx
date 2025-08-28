import React from 'react'

class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false, 
      errorMessage: '',
      isWebGLError: false 
    }
  }

  static getDerivedStateFromError(error) {
    // Check if this is a WebGL-related error
    const isWebGLError = error.message.includes('WebGL') || 
                        error.message.includes('context') ||
                        error.message.includes('THREE') ||
                        error.stack?.includes('three.module.js')

    return {
      hasError: true,
      errorMessage: error.message,
      isWebGLError
    }
  }

  componentDidCatch(error, errorInfo) {
    console.error('WebGL Error Boundary caught an error:', error, errorInfo)
    
    // Additional WebGL context cleanup
    if (this.state.isWebGLError) {
      // Attempt to clean up any WebGL contexts
      try {
        if (window.webglManager) {
          window.webglManager.cleanupAll()
        }
      } catch (cleanupError) {
        console.warn('Error during WebGL cleanup:', cleanupError)
      }
    }
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      if (this.state.isWebGLError) {
        return (
          <div className="w-full h-96 bg-gradient-to-br from-cosmic-purple/10 to-golden-wisdom/10 rounded-xl flex items-center justify-center">
            <div className="text-center p-8 max-w-md">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-heading font-semibold text-cosmic mb-2">
                3D Visualization Temporarily Unavailable
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                We're experiencing a temporary issue with the 3D visualization. 
                This doesn't affect the core functionality of the website.
              </p>
              <div className="space-y-2">
                <button 
                  onClick={this.handleReload}
                  className="btn-primary text-sm px-4 py-2 w-full"
                >
                  Try Again
                </button>
                <p className="text-xs text-gray-500">
                  If this persists, try refreshing your browser or updating your graphics drivers.
                </p>
              </div>
            </div>
          </div>
        )
      }

      // Non-WebGL errors
      return (
        <div className="w-full h-96 bg-red-50 border-2 border-red-200 rounded-xl flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-2xl mb-2">❌</div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Something went wrong
            </h3>
            <p className="text-red-600 text-sm mb-4">
              {this.state.errorMessage}
            </p>
            <button 
              onClick={this.handleReload}
              className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default WebGLErrorBoundary
