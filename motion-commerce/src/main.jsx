import React,{useEffect,useMemo,useState} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter,useLocation,useNavigate,useParams,Routes,Route,Link} from "react-router-dom";
import {Search,ShoppingBag,Heart,User,Menu,X,ArrowUpRight,Plus,Minus,Trash2,Check,ChevronRight,SlidersHorizontal,ShieldCheck,LogOut,AlertTriangle} from "lucide-react";
import "./styles.css";
import "./components/HeaderMotion.css";
import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import { AuthProvider, useAuth } from "./AuthContext";
import AuthModal from "./AuthModal";
import NexoraCinematicAnimation from "./NexoraCinematicAnimation";
import AllMenusPage from "./views/AllMenusPage";
import PlaceholderPage from "./views/PlaceholderPage";
import { ThemeProvider } from "./context/ThemeContext";
import { StoreProvider } from "./context/StoreContext";
import { ALL_PRODUCTS, ALL_CATEGORIES } from "./data";
import HeroProductShowcase from "./components/HeroProductShowcase";
import ProductDetailsPage from "./views/ProductDetails";
import Fashion from "./views/Fashion";
import Footwear from "./views/Footwear";
import Beauty from "./views/Beauty";
import Electronics from "./views/Electronics";
import HomeFurniture from "./views/HomeFurniture";
import Grocery from "./views/Grocery";
import Healthcare from "./views/Healthcare";
import Jewelry from "./views/Jewelry";
import Books from "./views/Books";
import Gaming from "./views/Gaming";
import Automotive from "./views/Automotive";
import Agriculture from "./views/Agriculture";
import Pets from "./views/Pets";
import TravelPage from "./views/Travel";
import Tickets from "./views/Tickets";
import DigitalProducts from "./views/DigitalProducts";
import Software from "./views/Software";
import OnlineCourses from "./views/OnlineCourses";
import FoodDelivery from "./views/FoodDelivery";
import Services from "./views/Services";
import {
  MotionReveal,
  StaggerContainer,
  StaggerItem,
  MagneticButton,
  ShineButton,
  AnimatedDropdown,
  AnimatedCounter,
  SkeletonLoader,
  Accordion,
  ParallaxSection,
  QuantitySelector,
  CheckoutProgress,
  OrderSuccessCheckmark
} from "./components/MotionComponents";

// Normalizing catalog products for main view components
const products = (ALL_PRODUCTS && ALL_PRODUCTS.length > 0 ? ALL_PRODUCTS : []).map(p => ({
  ...p,
  old: p.originalPrice || p.old || Math.round(p.price * 1.25)
}));

const cats = (ALL_CATEGORIES && ALL_CATEGORIES.length > 0 ? ALL_CATEGORIES : []).map(c => [
  c.name,
  c.heroImage || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
]);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px", textAlign: "center", color: "#fff", background: "#09090b", minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h2 style={{ color: "#d4af37", marginBottom: "16px" }}>Something went wrong.</h2>
          <p style={{ color: "#a1a1aa", maxWidth: "500px", marginBottom: "24px" }}>
            {this.state.error?.message || "An unexpected error occurred while rendering this section."}
          </p>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = "/"; }}
            style={{ padding: "10px 24px", background: "linear-gradient(135deg, #d4af37, #9e7512)", border: "none", borderRadius: "99px", color: "#000", fontWeight: "700", cursor: "pointer" }}
          >
            Return to Homepage
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function useStored(key,initial){const [v,setV]=useState(()=>JSON.parse(localStorage.getItem(key)||"null")??initial);useEffect(()=>localStorage.setItem(key,JSON.stringify(v)),[key,v]);return [v,setV]}
function Motion({children,className="",delay=0}){
  return (
    <MotionReveal delay={delay} className={className} direction="up" distance={26}>
      {children}
    </MotionReveal>
  );
}

/** Scroll to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

/** Page transition wrapper — renders children directly keyed by path
 *  to avoid stale-children bugs that caused "navigation only works after refresh" */
function PageTransition({ children }) {
  const location = useLocation();
  const [transitionStage, setTransitionStage] = useState("page-enter");

  useEffect(() => {
    setTransitionStage("page-exit");
    const timer = setTimeout(() => {
      setTransitionStage("page-enter");
    }, 120);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className={`page-transition ${transitionStage}`} key={location.pathname}>
      {children}
    </div>
  );
}

function ProductCard({p,wish,onWish,onAdd,showDelete = false}){
  return (
    <article className="card">
      <div className="pimage">
        <img loading="lazy" src={p.image} alt={p.name}/>
        <span className="tag">{p.tag}</span>
        {showDelete ? (
          <button
            type="button"
            className="card-delete-icon-btn"
            onClick={(e)=>{e.preventDefault(); e.stopPropagation(); onWish(p.id);}}
            aria-label="Delete from wishlist"
            title="Delete from wishlist"
          >
            <Trash2 size={16} />
          </button>
        ) : (
          <button
            type="button"
            className={"heart "+(wish ? "liked" : "")}
            onClick={(e)=>{e.preventDefault(); e.stopPropagation(); onWish(p.id);}}
            aria-label={wish ? "Remove from wishlist" : "Add to wishlist"}
            title={wish ? "Remove from wishlist" : "Save to wishlist"}
          >
            <Heart size={17} fill={wish ? "#ff4b72" : "none"} color={wish ? "#ff4b72" : "#ffffff"} strokeWidth={2.2} />
          </button>
        )}
        <Link to={"/product/"+p.id} className="quick">
          Quick view <ArrowUpRight size={15}/>
        </Link>
      </div>
      <div className="pbody">
        <small>{p.brand} · {p.category}</small>
        <h3>{p.name}</h3>
        <div className="rating">★★★★★ <span>{p.rating} ({p.reviews})</span></div>
        <div className="price">
          <strong>₹{p.price.toLocaleString("en-IN")}</strong>
          <del>₹{p.old.toLocaleString("en-IN")}</del>
          <em>{Math.round((1-p.price/p.old)*100)}% OFF</em>
        </div>
        <button className="add" onClick={()=>onAdd(p)}>Add to Cart <Plus size={17}/></button>
      </div>
    </article>
  );
}

function Home({wish,setWish,add}){
  const faqItems = [
    { title: "What makes NEXORA's luxury curation unique?", content: "Every piece in the NEXORA catalog is vetted by world-class ateliers for artisanal craftsmanship, verifiable provenance, and enduring design integrity." },
    { title: "What are your shipping and express delivery options?", content: "We offer complimentary express delivery across India on orders over ₹4,999. All packages are insured and tracked with white-glove security." },
    { title: "How does the 30-day effortless return guarantee work?", content: "If you're not completely satisfied, request a return within 30 days from your account portal for a prompt, complimentary doorstep pickup." }
  ];

  return (
    <main>
      {/* 35 — Ambient background motion layer */}
      <div className="ambient-bg-motion-container" aria-hidden="true">
        <div className="ambient-motion-orb" style={{ top: "10%", left: "15%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(212,175,55,0.2), transparent 70%)" }} />
        <div className="ambient-motion-orb" style={{ top: "45%", right: "10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(245,215,127,0.15), transparent 70%)", animationDelay: "-6s" }} />
      </div>

      {/* 12, 13, 14 — Hero Text Reveal, Image Reveal & Parallax */}
      <section className="hero">
        <div className="heroGlow"></div>
        <div className="heroText">
          <MotionReveal delay={60} direction="up" distance={20}>
            <span className="eyebrow" style={{letterSpacing:"2.5px",color:"#d4af37"}}>NEW COLLECTION</span>
          </MotionReveal>
          <MotionReveal delay={140} direction="up" distance={30}>
            <h1>Style<br/><i>Moves Forward</i></h1>
          </MotionReveal>
          <MotionReveal delay={220} direction="up" distance={25}>
            <p>Discover premium fashion, accessories and lifestyle essentials crafted for a brighter you.</p>
          </MotionReveal>
          <MotionReveal delay={300} direction="up" distance={20}>
            <div className="heroBtns" style={{display:"flex",gap:"14px",alignItems:"center",flexWrap:"wrap"}}>
              {/* 21 & 22 — Magnetic Button with Shine Sweep */}
              <MagneticButton maxDisplacement={6}>
                <Link to="/shop" style={{textDecoration:"none"}}>
                  <ShineButton as="span" variant="primary">
                    Shop Collection <ArrowUpRight size={16}/>
                  </ShineButton>
                </Link>
              </MagneticButton>
              <Link className="btn ghost" to="/categories">Explore Categories</Link>
            </div>
          </MotionReveal>

          {/* 28 — Animated Numbers Counter */}
          <div className="hero-trust-metrics" style={{display:"flex",gap:"36px",marginTop:"48px",paddingTop:"24px",borderTop:"1px solid rgba(255,255,255,0.08)"}}>
            <div>
              <strong style={{display:"block",fontSize:"22px",fontWeight:"800",color:"#fff"}}>
                <AnimatedCounter target={5000} suffix="+" />
              </strong>
              <small style={{fontSize:"11px",color:"#8e8e99"}}>Happy Customers</small>
            </div>
            <div>
              <strong style={{display:"block",fontSize:"22px",fontWeight:"800",color:"#fff"}}>
                <AnimatedCounter target={100} suffix="+" />
              </strong>
              <small style={{fontSize:"11px",color:"#8e8e99"}}>Premium Brands</small>
            </div>
            <div>
              <strong style={{display:"block",fontSize:"22px",fontWeight:"800",color:"#fff"}}>
                <AnimatedCounter target={50} suffix="+" />
              </strong>
              <small style={{fontSize:"11px",color:"#8e8e99"}}>Categories</small>
            </div>
          </div>
        </div>

        {/* 14 — Parallax Multi-Product Showcase (20+ Products, 7 Transition Effects) */}
        <ParallaxSection speed={0.08} className="heroProduct">
          <MotionReveal delay={200} direction="none">
            <HeroProductShowcase products={products} />
          </MotionReveal>
        </ParallaxSection>
      </section>

      {/* 16 — Staggered Category Card Reveal */}
      <section className="section">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">SHOP BY WORLD</span>
            <h2>Find your <i>next</i> favorite.</h2>
          </div>
          <Link to="/categories">View all <ArrowUpRight/></Link>
        </div>
        <StaggerContainer className="catGrid" staggerInterval={75}>
          {cats.map((c) => (
            <StaggerItem key={c[0]}>
              <Link to={"/shop?category="+c[0]} className="cat">
                <img src={c[1]} alt={c[0]}/>
                <div><span>{c[0]}</span><ArrowUpRight/></div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Featured Products */}
      <section className="section dark">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">THE EDIT</span>
            <h2>Featured <i>now.</i></h2>
          </div>
          <Link to="/shop">Shop all <ArrowUpRight/></Link>
        </div>
        <StaggerContainer className="products" staggerInterval={90}>
          {products.slice(0,4).map((p) => (
            <StaggerItem key={p.id}>
              <ProductCard p={p} wish={wish.includes(p.id)} onWish={setWish} onAdd={add}/>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 33 — Accordion Reveal (FAQ / Guarantees) */}
      <section className="section" style={{maxWidth:"800px",margin:"0 auto",padding:"40px 20px"}}>
        <div className="sectionHead" style={{textAlign:"center",marginBottom:"32px",display:"block"}}>
          <span className="eyebrow">EFFORTLESS ASSURANCE</span>
          <h2>Frequently Asked <i>Questions</i></h2>
        </div>
        <Accordion items={faqItems} />
      </section>

      <section className="statement">
        <MotionReveal delay={80}>
          <span className="eyebrow">NEXORA / 2026</span>
          <h2>Objects with a point<br/><i>of view.</i></h2>
          <p>Thoughtful products. Considered materials. A shopping experience that moves at your pace.</p>
          <MagneticButton maxDisplacement={5}>
            <Link to="/shop" style={{textDecoration:"none"}}>
              <ShineButton as="span" variant="primary">
                Discover the edit <ArrowUpRight size={16}/>
              </ShineButton>
            </Link>
          </MagneticButton>
        </MotionReveal>
      </section>
    </main>
  );
}

function Shop({wish,setWish,add}){
  const location = useLocation();
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [q, setQ] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get("category");
    if (catParam) {
      setFilter(catParam);
    }
  }, [location.search]);

  const sortOptions = [
    { value: "Featured", label: "Featured Curation" },
    { value: "Price: Low → High", label: "Price: Low → High" },
    { value: "Price: High → Low", label: "Price: High → Low" },
    { value: "Top Rated", label: "Top Rated (★)" }
  ];

  const filtered = useMemo(() => {
    let a = products.filter((p) => {
      const matchCat =
        filter === "All" ||
        (p.categoryName && p.categoryName.toLowerCase() === filter.toLowerCase()) ||
        (p.category && p.category.toLowerCase() === filter.toLowerCase()) ||
        (p.categorySlug && p.categorySlug.toLowerCase() === filter.toLowerCase());

      const query = q.trim().toLowerCase();
      const matchQuery =
        !query ||
        (p.name && p.name.toLowerCase().includes(query)) ||
        (p.brand && p.brand.toLowerCase().includes(query)) ||
        (p.categoryName && p.categoryName.toLowerCase().includes(query)) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(query));

      return matchCat && matchQuery;
    });

    if (sort === "Price: Low → High") a.sort((x, y) => x.price - y.price);
    if (sort === "Price: High → Low") a.sort((x, y) => y.price - x.price);
    if (sort === "Top Rated") a.sort((x, y) => (y.rating || 0) - (x.rating || 0));
    return a;
  }, [filter, sort, q]);

  return (
    <main className="page">
      <MotionReveal>
        <div className="pageHero">
          <span className="eyebrow">THE COLLECTION</span>
          <h1>Shop the <i>edit.</i></h1>
          <p>Curated luxury and everyday essentials across 20 distinct categories.</p>
        </div>
      </MotionReveal>

      <div className="shopbar">
        <div className="filters">
          {["All", ...cats.map(x => x[0])].map((x) => (
            <button
              className={filter === x ? "sel" : ""}
              onClick={() => setFilter(x)}
              key={x}
            >
              {x}
            </button>
          ))}
        </div>
        <div className="shopbar-actions">
          <div className="shop-search-wrapper">
            <Search size={16} className="shop-search-icon" />
            <input
              type="text"
              placeholder="Search products, brands, tags..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="shop-search-input"
            />
            {q && (
              <button
                type="button"
                className="shop-search-clear"
                onClick={() => setQ("")}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
          {/* 24 — Reusable Animated Dropdown */}
          <AnimatedDropdown
            label="Sort by"
            options={sortOptions}
            value={sort}
            onChange={(val) => setSort(val)}
          />
        </div>
      </div>

      {/* 16 — Staggered Card Reveal in Shop */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#a1a1aa" }}>
          <p style={{ fontSize: "18px", color: "#e4e4e7", marginBottom: "8px" }}>No items found</p>
          <p style={{ fontSize: "14px" }}>
            No products match the selected category "{filter}" or search term "{q}".
          </p>
          <button
            onClick={() => { setFilter("All"); setQ(""); }}
            style={{
              marginTop: "16px",
              padding: "8px 20px",
              borderRadius: "99px",
              background: "linear-gradient(135deg, #d4af37, #9e7512)",
              color: "#000",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer"
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <StaggerContainer className="products shopgrid" staggerInterval={70}>
          {filtered.map((p) => (
            <StaggerItem key={p.id}>
              <ProductCard p={p} wish={wish.includes(p.id)} onWish={setWish} onAdd={add}/>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </main>
  );
}

function CategoriesView() {
  return (
    <main className="page">
      <MotionReveal>
        <div className="pageHero">
          <span className="eyebrow">WORLD OF NEXORA</span>
          <h1>Explore <i>Categories.</i></h1>
          <p>Discover hand-crafted goods across 20 premium worlds of design and utility.</p>
        </div>
      </MotionReveal>

      <StaggerContainer className="catGrid" staggerInterval={50}>
        {cats.map((c) => (
          <StaggerItem key={c[0]}>
            <Link to={"/shop?category=" + encodeURIComponent(c[0])} className="cat">
              <img src={c[1]} alt={c[0]} />
              <div>
                <span>{c[0]}</span>
                <ArrowUpRight />
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </main>
  );
}

function Product({wish,setWish,add}){
  const {id}=useParams();
  const p=products.find(x=>x.id===+id)||products[0];
  const [qty,setQty]=useState(1);
  const [img,setImg]=useState(p.image);
  const isWish = wish.includes(p.id);

  return (
    <main className="page">
      <div className="detail">
        <MotionReveal className="gallery" direction="none">
          {/* 26 — Image Gallery Transition (fade & slight scale) */}
          <div className="mainimg" style={{overflow:"hidden",position:"relative"}}>
            <img
              key={img}
              src={img}
              alt={p.name}
              style={{
                animation: "modalFadeIn 350ms var(--ease-primary) both",
                transition: "transform 400ms var(--ease-smooth)"
              }}
            />
          </div>
          <div className="thumbs">
            {[p.image,...products.slice(0,3).map(x=>x.image)].map((x,i)=>(
              <button
                className={img===x?"active":""}
                onClick={()=>setImg(x)}
                key={i}
                style={{transition:"all 220ms var(--ease-primary)"}}
              >
                <img src={x} alt=""/>
              </button>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal className="detailInfo" delay={80} direction="up" distance={25}>
          <span className="eyebrow">{p.brand} / {p.category}</span>
          <h1>{p.name}</h1>
          <div className="rating">★★★★★ <span>{p.rating} · {p.reviews} reviews</span></div>
          <div className="bigprice">
            ₹{p.price.toLocaleString("en-IN")} <del>₹{p.old.toLocaleString("en-IN")}</del>
          </div>
          <p className="desc">A refined everyday essential with thoughtful details, premium materials and a silhouette designed to stay relevant beyond the season.</p>
          <div className="options">
            <label>Color</label>
            <div className="swatches">
              <button className="swatch darksw"></button>
              <button className="swatch"></button>
              <button className="swatch warm"></button>
            </div>
          </div>

          <div className="buyrow">
            {/* 27 — Quantity Micro-Motion */}
            <QuantitySelector value={qty} onChange={setQty} min={1} max={10} />

            {/* 22 — ShineButton with 20 — Cart Confirmation */}
            <ShineButton
              variant="primary"
              className="wide"
              onClick={()=>{for(let i=0;i<qty;i++)add(p)}}
            >
              Add to cart <ShoppingBag size={18}/>
            </ShineButton>

            {/* 19 — Wishlist Pulse Button */}
            <button
              type="button"
              className={`wishBig ${isWish ? "liked is-active" : ""}`}
              onClick={()=>setWish(p.id)}
              aria-label={isWish ? "Remove from wishlist" : "Add to wishlist"}
              title={isWish ? "In Wishlist (Click to remove)" : "Save to Wishlist"}
            >
              <Heart size={21} fill={isWish ? "#ff4b72" : "none"} color={isWish ? "#ff4b72" : "currentColor"} strokeWidth={2.2} />
            </button>
          </div>

          <div className="detailsList">
            <div><span>Delivery</span><b>Free delivery · 2–5 days</b></div>
            <div><span>Returns</span><b>30-day easy returns</b></div>
            <div><span>Availability</span><b>In stock</b></div>
          </div>
        </MotionReveal>
      </div>
    </main>
  );
}

function Cart({cart,setCart}){
  const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
  return (
    <main className="page">
      <div className="pageHero small">
        <span className="eyebrow">YOUR BAG</span>
        <h1>Cart <i>({cart.reduce((s,x)=>s+x.qty,0)})</i></h1>
      </div>
      {!cart.length ? (
        <div className="empty">
          <ShoppingBag size={45}/>
          <h2>Your cart is empty.</h2>
          <p>Discover products you'll love.</p>
          <Link className="btn primary" to="/shop">Start shopping</Link>
        </div>
      ) : (
        <div className="cartLayout">
          <div className="cartItems">
            {cart.map(x=>(
              <div className="cartItem" key={x.id}>
                <img src={x.image} alt={x.name}/>
                <div>
                  <small>{x.brand}</small>
                  <h3>{x.name}</h3>
                  <span>₹{x.price.toLocaleString("en-IN")}</span>
                  {/* 27 — Quantity Micro-Motion */}
                  <QuantitySelector
                    value={x.qty}
                    onChange={(newQty)=>{
                      setCart(cart.map(y=>y.id===x.id?{...y,qty:newQty}:y));
                    }}
                    min={1}
                  />
                </div>
                <button className="remove" onClick={()=>setCart(cart.filter(y=>y.id!==x.id))}>
                  <Trash2 size={16}/>
                </button>
              </div>
            ))}
          </div>

          <aside className="summary">
            <span className="eyebrow">SUMMARY</span>
            <h2>Ready when you are.</h2>
            <div><span>Subtotal</span><b>₹{total.toLocaleString("en-IN")}</b></div>
            <div><span>Shipping</span><b>Free</b></div>
            <div className="total"><span>Total</span><b>₹{total.toLocaleString("en-IN")}</b></div>
            <Link to="/checkout" style={{textDecoration:"none",display:"block",marginTop:"16px"}}>
              <ShineButton as="span" variant="primary" style={{width:"100%"}}>
                Proceed to checkout <ArrowUpRight size={16}/>
              </ShineButton>
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}

function Wishlist({wish,setWish,add}){
  const ps=products.filter(p=>wish.includes(p.id));

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all items from your wishlist?")) {
      ps.forEach(p => setWish(p.id));
    }
  };

  return (
    <main className="page">
      <div className="pageHero small" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:"16px"}}>
        <div>
          <span className="eyebrow">SAVED FOR LATER</span>
          <h1>Your <i>wishlist ({ps.length})</i></h1>
          <p>Your curated shortlist of favorite luxury items and everyday essentials.</p>
        </div>
        {ps.length > 0 && (
          <button
            type="button"
            className="wishlist-clear-btn"
            onClick={handleClearAll}
            title="Clear all saved items"
          >
            <Trash2 size={16} />
            <span>Clear Wishlist</span>
          </button>
        )}
      </div>

      {ps.length ? (
        <StaggerContainer className="products" staggerInterval={75}>
          {ps.map((p)=>(
            <StaggerItem key={p.id}>
              <div className="wishlist-card-wrapper">
                <ProductCard p={p} wish={true} onWish={setWish} onAdd={add} showDelete={true}/>
                <button
                  type="button"
                  className="wishlist-delete-bar-btn"
                  onClick={()=>setWish(p.id)}
                  aria-label={`Remove ${p.name} from wishlist`}
                  title="Remove from wishlist"
                >
                  <Trash2 size={15}/>
                  <span>Remove Item</span>
                </button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="empty">
          <Heart size={48} color="#d4af37"/>
          <h2>Your wishlist is empty.</h2>
          <p>Tap the heart icon on any product to save your favorites here.</p>
          <Link className="btn primary" to="/shop">Explore Collection <ArrowUpRight size={16}/></Link>
        </div>
      )}
    </main>
  );
}

function Checkout(){
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  return (
    <main className="page">
      {done ? (
        <div className="success">
          {/* 30 — Success Animation Drawing Checkmark */}
          <OrderSuccessCheckmark />
          <span className="eyebrow">ORDER COMPLETE</span>
          <h1>You're all <i>set.</i></h1>
          <p>Your order #NV-2026-921 has been confirmed. A concierge tracking notification has been dispatched.</p>
          <Link to="/shop" style={{textDecoration:"none",display:"inline-block",marginTop:"20px"}}>
            <ShineButton as="span" variant="primary">
              Continue shopping <ArrowUpRight size={16}/>
            </ShineButton>
          </Link>
        </div>
      ) : (
        <div className="checkout">
          <div>
            {/* 29 — Checkout Progress Indicator */}
            <CheckoutProgress currentStep={step} />

            <span className="eyebrow">CHECKOUT</span>
            <h1>Almost <i>there.</i></h1>

            <label>Email<input type="email" placeholder="you@example.com"/></label>
            <label>Full name<input placeholder="Your full legal name"/></label>
            <label>Address<input placeholder="Delivery address & suite"/></label>
            <div className="two">
              <label>City<input placeholder="City"/></label>
              <label>PIN code<input placeholder="PIN code"/></label>
            </div>

            <ShineButton
              variant="primary"
              onClick={() => {
                if (step < 3) {
                  setStep(step + 1);
                } else {
                  setDone(true);
                }
              }}
              style={{marginTop:"20px",width:"100%"}}
            >
              {step === 3 ? "Place order & Complete Payment" : "Continue to Next Step"} <Check size={16}/>
            </ShineButton>
          </div>

          <aside className="summary">
            <span className="eyebrow">CONCIERGE CHECKOUT</span>
            <h2>Your details stay encrypted.</h2>
            <p>Every transaction on NEXORA is protected with end-to-end 256-bit bank encryption and white-glove courier guarantee.</p>
          </aside>
        </div>
      )}
    </main>
  );
}

function NotFound404() {
  return (
    <main className="page" style={{ paddingTop: 100, textAlign: "center", minHeight: "65vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <span className="eyebrow" style={{ letterSpacing: "3px", color: "#d4af37", marginBottom: 12 }}>NEXORA 404</span>
      <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", marginBottom: 16 }}>Page <i>Not Found.</i></h1>
      <p style={{ color: "#a1a1aa", maxWidth: 480, margin: "0 auto 32px", fontSize: 16, lineHeight: 1.6 }}>
        The destination you are looking for has been moved, curated into a new capsule, or does not exist.
      </p>
      <div style={{ display: "flex", gap: 14 }}>
        <Link to="/" className="btn primary" style={{ background: "linear-gradient(135deg, #d4af37, #9e7512)", color: "#000", fontWeight: 700, padding: "12px 28px", borderRadius: 999, textDecoration: "none" }}>
          Return Home <ArrowUpRight size={16} style={{ display: "inline", verticalAlign: "middle" }} />
        </Link>
        <Link to="/shop" className="btn ghost" style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#fff", padding: "12px 24px", borderRadius: 999, textDecoration: "none" }}>
          Explore Shop
        </Link>
      </div>
    </main>
  );
}

function App(){
  const [cart,setCart]=useStored("nova-cart",[]);
  const [wish,setWishState]=useStored("nova-wish",[]);
  const [cartOpen,setCartOpen]=useState(false);
  const [cinemaMode,setCinemaMode]=useState(false);
  const [toast,setToast]=useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ id: Date.now(), msg, type });
    setTimeout(() => {
      setToast(prev => prev?.msg === msg ? null : prev);
    }, 2800);
  };

  const add = p => {
    setCart(c => {
      const found = c.find(x => x.id === p.id);
      return found ? c.map(x => x.id === p.id ? {...x, qty: x.qty + 1} : x) : [...c, {...p, qty: 1}];
    });
    showToast(`Added "${p.name}" to cart`, "success");
  };

  const wishToggle = id => {
    const prod = products.find(x => x.id === id);
    const name = prod?.name || "Item";
    setWishState(w => {
      const exists = w.includes(id);
      if (exists) {
        showToast(`Removed "${name}" from wishlist`, "info");
        return w.filter(x => x !== id);
      } else {
        showToast(`Saved "${name}" to your wishlist`, "success");
        return [...w, id];
      }
    });
  };

  return (
    <>
      <NexoraCinematicAnimation isBackground={!cinemaMode}/>
      <div className="cinema-mode-toggle">
        <button onClick={()=>setCinemaMode(!cinemaMode)} className={cinemaMode?"active":""}>
          {cinemaMode?"✦ Return to Store":"✦ Watch Full Cinematic Logo Animation"}
        </button>
      </div>
      <Header cartCount={cart.reduce((s,x)=>s+x.qty,0)} wishCount={wish.length} onOpenCart={()=>setCartOpen(true)}/>
      <div style={{opacity:cinemaMode?0:1,pointerEvents:cinemaMode?"none":"auto",transition:"opacity 0.6s ease"}}>
        <ScrollToTop />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home wish={wish} setWish={wishToggle} add={add}/>}/>
            <Route path="/shop" element={<Shop wish={wish} setWish={wishToggle} add={add}/>}/>
            <Route path="/categories" element={<CategoriesView/>}/>
            <Route path="/product/:id" element={<ProductDetailsPage/>}/>
            <Route path="/wishlist" element={<Wishlist wish={wish} setWish={wishToggle} add={add}/>}/>
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/menus" element={<AllMenusPage/>}/>
            <Route path="/about" element={<PlaceholderPage/>}/>
            <Route path="/help" element={<PlaceholderPage/>}/>
            <Route path="/contact" element={<PlaceholderPage/>}/>
            <Route path="/account" element={<PlaceholderPage/>}/>
            <Route path="/collections" element={<PlaceholderPage/>}/>
            <Route path="/new-arrivals" element={<PlaceholderPage/>}/>
            {/* 20 Category Pages */}
            <Route path="/fashion" element={<Fashion/>}/>
            <Route path="/footwear" element={<Footwear/>}/>
            <Route path="/beauty" element={<Beauty/>}/>
            <Route path="/electronics" element={<Electronics/>}/>
            <Route path="/home-furniture" element={<HomeFurniture/>}/>
            <Route path="/grocery" element={<Grocery/>}/>
            <Route path="/healthcare" element={<Healthcare/>}/>
            <Route path="/jewelry" element={<Jewelry/>}/>
            <Route path="/books" element={<Books/>}/>
            <Route path="/gaming" element={<Gaming/>}/>
            <Route path="/automotive" element={<Automotive/>}/>
            <Route path="/agriculture" element={<Agriculture/>}/>
            <Route path="/pets" element={<Pets/>}/>
            <Route path="/travel" element={<TravelPage/>}/>
            <Route path="/tickets" element={<Tickets/>}/>
            <Route path="/digital-products" element={<DigitalProducts/>}/>
            <Route path="/software" element={<Software/>}/>
            <Route path="/courses" element={<OnlineCourses/>}/>
            <Route path="/food" element={<FoodDelivery/>}/>
            <Route path="/services" element={<Services/>}/>
            <Route path="*" element={<NotFound404/>}/>
        </Routes>
      </PageTransition>
      <Footer />
    </div>
    <CartDrawer isOpen={cartOpen} onClose={()=>setCartOpen(false)} cart={cart} setCart={setCart}/>
    <AuthModal/>
    {toast && (
      <div className={`site-toast toast-${toast.type}`} role="status">
        <span className="toast-icon">{toast.type === "success" ? "♥" : "✦"}</span>
        <span className="toast-text">{toast.msg}</span>
      </div>
    )}
  </>
  );
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <StoreProvider>
            <App/>
          </StoreProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </BrowserRouter>
);
