import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Plus, Brain, Zap, BarChart } from "lucide-react";
import beeHero from "@/assets/bee-hero.jpg";

const Home = () => {
  return (
    <div className="space-y-16 relative">
      {/* Bee decorations */}
      {/* <div className="bee-decoration" style={{ top: '10%', left: '5%' }}></div>
      <div className="bee-decoration" style={{ top: '15%', right: '8%', animationDelay: '1s' }}></div>
      <div className="bee-decoration" style={{ top: '60%', left: '3%', animationDelay: '2s' }}></div>
      <div className="bee-decoration" style={{ top: '70%', right: '10%', animationDelay: '0.5s' }}></div> */}
      
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent relative">
              StudyNow
              {/* <div className="honey-drip" style={{ top: '20px', right: '20%' }}></div>
              <div className="honey-drip" style={{ top: '40px', left: '25%', animationDelay: '1s' }}></div> */}
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/create-deck">
              <Button size="lg" className="hero-gradient text-primary-foreground px-8 py-6 text-lg font-semibold glow-effect">
                <Plus className="w-5 h-5 mr-2" />
                Create Your Flashcards
              </Button>
            </Link>
            <Link to="/my-decks">
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg font-semibold">
                 Browse
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the features that make learning fun!!!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="card-shadow glow-effect hover:scale-105 transition-all duration-300">
            <CardHeader className="text-center">
              {/* <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div> */}
              <CardTitle>Learn</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Interactive flashcards
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="card-shadow glow-effect hover:scale-105 transition-all duration-300">
            <CardHeader className="text-center">
              {/* <div className="w-12 h-12 bg-gradient-to-br from-success to-success/80 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-success-foreground" />
              </div> */}
              <CardTitle>Quick</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Quicky review sessions with your flashcards
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="card-shadow glow-effect hover:scale-105 transition-all duration-300">
            <CardHeader className="text-center">
              {/* <div className="w-12 h-12 bg-gradient-to-br from-warning to-warning/80 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart className="w-6 h-6 text-warning-foreground" />
              </div> */}
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Track your learning progress with detailed stats and insights
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="text-center py-16 hero-gradient rounded-3xl">
        <div className="max-w-2xl mx-auto text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">🐝 Ready to Join the Hive?</h2>
          <p className="text-lg opacity-90 mb-8">
            Buzz along with thousands of busy bees who are already collecting sweet knowledge with StudyNow! 🍯
          </p>
          <Link to="/create-deck">
            <Button size="lg" variant="secondary" className="px-8 py-6 text-lg font-semibold">
              🍯 Start Collecting Honey Now!
            </Button>
          </Link>
        </div>
      </section> */}
    </div>
  );
};

export default Home;