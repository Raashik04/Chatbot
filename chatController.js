const Product = require('../models/Product');

const handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });

    const lowerMsg = message.toLowerCase();
    
    // Detect intents
    const isPayment = lowerMsg.includes('cod') || lowerMsg.includes('pay') || lowerMsg.includes('upi') || lowerMsg.includes('card');
    const isDelivery = lowerMsg.includes('deliver') || lowerMsg.includes('ship') || lowerMsg.includes('kedaikuma') || lowerMsg.includes('po');
    const isCustomization = lowerMsg.includes('custom') || lowerMsg.includes('modify') || lowerMsg.includes('change') || lowerMsg.includes('design');
    
    // Detect product search (budget, cheap, ₹)
    let budget = null;
    let category = null;
    let woodType = null;
    let isProductSearch = false;
    
    // Budget Detection
    const priceMatch = lowerMsg.match(/(?:₹|rs\.?|rs)\s*(\d+)/) || lowerMsg.match(/(\d+)\s*(?:rupees|rs)/) || lowerMsg.match(/budget.*?(\d+)/);
    if (priceMatch) {
      budget = parseInt(priceMatch[1], 10);
      isProductSearch = true;
    } else if (lowerMsg.includes('cheap') || lowerMsg.includes('budget') || lowerMsg.includes('low cost')) {
      budget = 15000; // default inexpensive budget
      isProductSearch = true;
    }

    // Category Detection
    const categories = ['sofa', 'chair', 'bed', 'table', 'wardrobe', 'bookshelf', 'living room', 'bedroom', 'dining'];
    for (const cat of categories) {
      if (lowerMsg.includes(cat)) {
        category = cat;
        isProductSearch = true;
        break;
      }
    }

    // Wood Type Detection
    const woods = ['sheesham', 'teak', 'mango', 'engineered'];
    for (const wood of woods) {
      if (lowerMsg.includes(wood)) {
        woodType = new RegExp(wood, 'i');
        isProductSearch = true;
        break;
      }
    }

    // Send friendly Responses
    if (isPayment) {
      return res.json({ 
        reply: "Haan ji, COD aur UPI rendume available iruku! You can easily choose your preferred payment method during checkout. Super simple! 💳💸"
      });
    }

    if (isDelivery) {
      return res.json({ 
        reply: "Delivery charges are ₹500, but orders above ₹50,000 ku FREE delivery! Unga area ku kandippa varum. Fast and safe delivery guaranteed. 🚚📦"
      });
    }

    if (isCustomization) {
      return res.json({ 
        reply: "Yes, we do customizations! Neenga unga requirements email (support@desiwoodmart.com) anupunga, our desi artisans will make it exactly how you want. Ekdum perfect! 🪵✨"
      });
    }

    if (isProductSearch) {
      let query = {};
      if (budget) {
        query.price = { $lte: budget };
      }
      
      if (category) {
        query.$or = [
          { name: { $regex: category, $options: 'i' } },
          { category: { $regex: category, $options: 'i' } }
        ];
      }

      if (woodType) {
        // Search in woodOptions array or potentially name if wood isn't in options
        query.$or = query.$or || [];
        query.$or.push({ woodOptions: { $regex: woodType } });
        query.$or.push({ name: { $regex: woodType } });
      }
      
      // Attempt to hit DB
      const products = await Product.find(query).limit(3);
      
      if (products.length > 0) {
        let reply = budget ? `₹${budget.toLocaleString('en-IN')} budget ku these options iruku 👍:\n\n` : `Here are some top pieces for you, macha! Pakka quality:\n\n`;
        products.forEach(p => {
          const woodStr = p.woodOptions && p.woodOptions.length ? ` (${p.woodOptions.join(', ')} Wood)` : '';
          reply += `🪵 *${p.name}*${woodStr} - ₹${p.price.toLocaleString('en-IN')}\n`;
        });
        reply += "\nHead over to our Products page to see detailed images and wood options!";
        return res.json({ reply });
      } else {
        return res.json({ reply: "Aiyyo, sorry nga! We couldn't find exact items matching your request in that range right now. Try increasing the budget or changing the wood type? 🙏" });
      }
    }

    // Default Greeting / Fallback response
    return res.json({ 
      reply: "Vanakkam! Kya haal hai? I'm your friendly DesiWood Assistant. 🪵\n\nI can help you with:\n1. Finding products by budget (e.g. '₹15000 budget la sofa iruka?')\n2. Payment options ('COD available ah?')\n3. Delivery info ('free delivery undo?')\n4. Customizations ('Can I custom design a bed?')\n\nEppadi help panlam?"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Oops! Something went wrong on my end. Internet connection issues pola. Please try again later. 🔌" });
  }
};

module.exports = { handleChat };
