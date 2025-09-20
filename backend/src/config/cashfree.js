const { Cashfree } = require('cashfree-pg');

class CashfreeConfig {
  constructor() {
    this.clientId = process.env.CASHFREE_APP_ID;
    this.clientSecret = process.env.CASHFREE_SECRET_KEY;
    this.environment = process.env.CASHFREE_ENVIRONMENT || 'TEST'; // TEST or PROD
    
    if (!this.clientId || !this.clientSecret) {
      throw new Error('Cashfree credentials are required');
    }
    
    // Initialize Cashfree
    Cashfree.XClientId = this.clientId;
    Cashfree.XClientSecret = this.clientSecret;
    Cashfree.XEnvironment = this.environment === 'PROD' 
      ? Cashfree.Environment.PRODUCTION 
      : Cashfree.Environment.SANDBOX;
  }

  getCashfreeInstance() {
    return Cashfree;
  }

  getConfig() {
    return {
      clientId: this.clientId,
      environment: this.environment,
      // Don't expose secret in config
    };
  }
}

module.exports = new CashfreeConfig();